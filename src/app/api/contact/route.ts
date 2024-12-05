import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ContactFormData } from '@/types/business-card';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cardId, ...formData } = body as ContactFormData & { cardId: string };

    // Get business card owner's details
    const result = await db.getBusinessCardWithUser(cardId);
    
    if (!result) {
      return NextResponse.json(
        { message: 'Business card not found' },
        { status: 404 }
      );
    }

    const { businessCard, user } = result;

    // Send data to Zapier webhook for Google Sheets
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    if (zapierWebhookUrl) {
      await fetch(zapierWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          cardOwner: user.email,
          ...formData,
        }),
      });
    }

    let calendarLink: string | undefined;

    // Handle meeting request
    if (formData.requestMeeting) {
      // Get calendar booking link from environment variables or generate one
      calendarLink = process.env.CALENDAR_BOOKING_URL?.replace(
        '{email}',
        user.email
      );
    }

    // Handle newsletter subscription
    if (formData.subscribeNewsletter) {
      // Add to newsletter list (implement your newsletter service integration here)
      // Example: Mailchimp, ConvertKit, etc.
    }

    // Create Google Contact via Zapier
    const zapierContactWebhookUrl = process.env.ZAPIER_CONTACT_WEBHOOK_URL;
    if (zapierContactWebhookUrl) {
      await fetch(zapierContactWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          notes: `Message: ${formData.message}\nSource: Business Card (${businessCard.username})`,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      calendarLink,
      message: 'Contact form submitted successfully',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { message: 'Failed to process contact form' },
      { status: 500 }
    );
  }
} 