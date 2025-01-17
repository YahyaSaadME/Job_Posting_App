/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect"; // MongoDB connection utility
import itRefJob from "../../../../models/itRefJob"; // Job model
import mailSender from "@/utils/mailSender"; // Your email utility
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/utils/auth" // Correct way to get session in App Router

export async function POST(request: NextRequest) {
  await dbConnect();

  const { pathname } = new URL(request.url);
  const jobId = pathname.split('/').pop();
  console.log(jobId);

  try {
    const body = await request.json();
    const { name, email, mobile, resume, currentCompany, noticePeriod } = body;

    // Validate required fields
    if (!name || !email || !mobile || !resume) {
      return NextResponse.json({ message: 'Name, Email, Mobile, and Resume are required.' }, { status: 400 });
    }

    // Get session from cookies using getSession
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'You must be logged in to apply.' }, { status: 401 });
    }

    const userEmail = session.user.email; // Get email from the session
    console.log('User Email:', userEmail);

    // Find the job by jobId
    const job = await itRefJob.findById(jobId);
    if (!job) {
      return NextResponse.json({ message: 'Job not found.' }, { status: 404 });
    }
  const type = session?.user?.type
   if(type === "jobPoster"){
    return NextResponse.json({ message: 'You can not apply !! you are not JobSeekers' }, { status: 400 });
   }
    // Check if the user has already applied by email
    const alreadyApplied = job.applicants.some((applicant: any) => applicant.email === userEmail);
    if (alreadyApplied) {
      return NextResponse.json({ message: 'You have already applied for this job.' }, { status: 400 });
    }

    // Add the applicant to the job's applicants list
    job.applicants.push({
      name,
      email: userEmail, // Use the email from the session
      mobile,
      resume,
      currentCompany,
      noticePeriod,
    });

    await job.save();

    // Send confirmation email to the applicant
    try {
      const emailResponse = await mailSender({
        email: userEmail,
        title: `Dear ${name}, You have successfully applied.`,
        body: `<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #003366;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
            line-height: 1.6;
        }
        .footer {
            background-color: #f0f0f0;
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #666666;
        }
        .footer a {
            color: #003366;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Shiv Infosec
        </div>
        <div class="content">
            Dear <strong>${name}</strong>,  
            <br><br>
            Thank you for choosing Shiv Infosec! Your application has been submitted to HR.  
            <br>
            The Shiv Infosec Team
        </div>
        <div class="footer">
            <p>Visit us at <a href="https://shivinfosec.com">shivinfosec.com</a></p>
        </div>
    </div>
</body>
</html>`,
      });

      if (emailResponse) {
        console.log("Email sent successfully");
        return NextResponse.json({ message: 'Application submitted successfully!', job });
      } else {
        console.log("Failed to send email");
        return NextResponse.json({ success: false, message: "Failed to send confirmation email." }, { status: 500 });
      }
    } catch (emailError: any) {
      console.error('Error sending confirmation email:', emailError);
      return NextResponse.json({ success: false, message: "Error sending confirmation email." }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error applying for job:', error);
    return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
  }
}
