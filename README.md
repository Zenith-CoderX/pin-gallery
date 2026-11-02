📌 Pin Gallery

A Pinterest-inspired image-sharing platform built with Next.js 16 and Supabase.

Pin Gallery is a modern, secure and responsive image gallery where users can explore beautiful images in a Pinterest-style masonry layout. It features secure authentication, admin-controlled image management and private cloud storage.

🌐 Live Demo: Visit Pin Gallery

✨ Features
📸 Pinterest-Style Gallery – Beautiful masonry layout for displaying images.
🔐 Secure Authentication – Custom login and registration system.
👤 User Access Control – Login required to access the gallery.
🛡️ Admin-Only Controls – Only authorized admins can upload and delete images.
☁️ Cloud Storage – Images stored securely using Supabase Storage.
🔒 Private Image Access – Images are delivered through temporary signed URLs.
⚡ Modern Technology – Built with Next.js 16 and React 19.
📱 Responsive Design – Designed for a smooth gallery experience across screen sizes.
🛠️ Tech Stack
Technology	Purpose
Next.js 16	React framework
React 19	UI development
Supabase	Database and storage
JavaScript	Application logic
bcryptjs	Password hashing
jose	JWT authentication
Zod	Data validation
React Hook Form	Form handling
📂 Project Structure
text
pin-gallery/
│
├── src/
│   ├── app/
│   └── ...
│
├── supabase/
│   └── schema.sql
│
├── README.md
├── package.json
├── package-lock.json
├── next.config.mjs
└── jsconfig.json

🚀 Getting Started

Follow these steps to run the project locally.

1. Clone the Repository
bash
git clone https://github.com/Zenith-CoderX/pin-gallery.git

2. Navigate to Project
bash
cd pin-gallery

3. Install Dependencies
bash
npm install

4. Configure Environment Variables

Copy .env.local.example to .env.local and configure the following variables:

env
SESSION_SECRET=your_generated_session_secret
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key


Generate a secure session secret:

bash
openssl rand -base64 32


Get your Supabase URL and service role key from your Supabase project settings under API.

Important: Never expose your Supabase service role key in client-side code or commit your .env.local file to GitHub.

5. Configure Supabase Database
Create a Supabase project.
Open the SQL Editor.
Run the SQL script from supabase/schema.sql.
This will create the required database tables and private image storage bucket.
6. Start Development Server
bash
npm run dev


Open your browser and visit:

text
http://localhost:3000

🔐 Security

Pin Gallery includes multiple security measures:

Password hashing using bcrypt.
JWT-based authentication using HTTP-only cookies.
Protected routes and server-side access checks.
Admin-only upload and delete permissions.
Private Supabase storage bucket.
Temporary signed URLs for image delivery.
📸 Live Preview

Check out the deployed application:

👉 Pin Gallery – Live Demo

👨‍💻 Author

Shahroz Khan

GitHub: @Zenith-CoderX

Project: Pin Gallery

⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub. Your support is appreciated!

Made with ❤️ using Next.js and Supabase.
