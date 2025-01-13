/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect"; // MongoDB connection utility
import itRefJob from "../../../../models/itRefJob"; // Job model
import { Types } from "mongoose";
import mailSender from "@/utils/mailSender";

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

        // Find the job and add the applicant
        const job = await itRefJob.findById(jobId);
        if (!job) {
          return NextResponse.json({ message: 'Job not found.' }, { status: 404 });
        }

        job.applicants.push({
          name,
          email,
          mobile,
          resume,
          currentCompany,
          noticePeriod,
        });

        await job.save();

        try {
          const emailResponse = await mailSender({
            email,
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
            Dear <strong>${email}</strong>,  
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
            return NextResponse.json({ message: 'Application submitted successfully!', job }, { status: 200 });
          } else {
            console.log("Failed to send email");
            return NextResponse.json({ success: false, message: "Failed to send OTP email." }, { status: 500 });
          }
          
        } catch (error: any) {
          console.log(error);
          return NextResponse.json({ success: false, message: "Error sending OTP email." }, { status: 500 });
        }
      
    } catch (error: any) {
      return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
    }
}
