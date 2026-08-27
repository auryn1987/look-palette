# Supabase Authentication Setup

This project uses Supabase for authentication with magic links and Google OAuth.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
PUBLIC_FRONTEND_URL=https://lookpalette.com
PUBLIC_FRONTEND_URL_TESTING=http://localhost:5173
```

### 3. Configure Authentication in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Settings**
3. Configure the following:

#### Site URL

Set your site URL (e.g., `http://localhost:5173` for development)

#### Redirect URLs

Add the following redirect URLs:

- `http://localhost:5173/auth/callback`
- `http://localhost:5173/dashboard`
- `https://yourdomain.com/auth/callback` (for production)
- `https://yourdomain.com/dashboard` (for production)

### 4. Enable Email Authentication

1. Go to **Authentication** > **Providers**
2. Enable **Email** provider
3. Configure email templates if desired

### 5. Enable Google OAuth (Optional)

1. Go to **Authentication** > **Providers**
2. Enable **Google** provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret

To get Google OAuth credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`

### 6. Email Configuration

Supabase handles email sending automatically. For production, you may want to configure a custom SMTP server:

1. Go to **Authentication** > **Settings** > **SMTP Settings**
2. Configure your SMTP server details

## Features

- **Magic Link Authentication**: Users can sign in/sign up with just their email
- **Google OAuth**: Users can sign in with their Google account
- **Session Management**: Automatic session handling with Supabase
- **Secure**: All authentication is handled server-side by Supabase

## API Endpoints

- `POST /api/auth/magic-link` - Send magic link email
- `GET /api/auth/session` - Get current user session
- `POST /api/auth/logout` - Sign out user
- `GET /auth/callback` - Handle authentication callbacks

## Usage

The authentication system is now ready to use! Users can:

1. Visit `/signin` or `/signup`
2. Enter their email to receive a magic link
3. Click the link in their email to authenticate
4. Or use the Google sign-in button for OAuth

After successful authentication, users will be redirected to `/dashboard`.
