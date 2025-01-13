/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect"; // MongoDB connection utility
import itRefJob from "../../../../models/itRefJob"; // Job model
import { Types } from "mongoose";
import mailSender from "@/utils/mailSender";

export async function GET(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const jobId = pathname.split('/').pop();
    console.log(jobId);
    
    await dbConnect();
    try {
      if(!jobId){
        return NextResponse.json({ success: false, message: 'Please provide id.' }, { status: 404 });
      }
      const job = await itRefJob.findById({_id:new Types.ObjectId(jobId)});
      console.log(job);
      
      if (!job) {
        return NextResponse.json({ success: false, message: 'job not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: job }, { status: 200 });
    } catch (error:any) {
        console.log(error);
        
      return NextResponse.json({ success: false, message: error }, { status: 400 });
    }
  }
  export async function PUT(request: NextRequest) {
    const { pathname } = new URL(request.url);
    const jobId = pathname.split('/').pop();
    console.log(jobId);
    try {
      await dbConnect();
      const body = await request.json();
      const {  ...updates } = body;  // _id is destructured from the request body
  
      // Ensure the _id is valid
      if (!jobId) {
        return NextResponse.json({ message: "Invalid job ID." }, { status: 400 });
      }
  
      // Find the job by ID
      const job = await itRefJob.findById(jobId);
  
      if (!job) {
        return NextResponse.json({ message: "Job not found." }, { status: 404 });
      }
  
      // Update the job with the provided updates
      const updatedJob = await itRefJob.findByIdAndUpdate(jobId, updates, {
        new: true,        // Return the updated job
        runValidators: true, // Ensure any validation rules are applied
      });
  
      if (!updatedJob) {
        return NextResponse.json({ message: "Failed to update job." }, { status: 500 });
      }
  
      return NextResponse.json(updatedJob);  // Return the updated job details
    } catch (error) {
      console.error("Error updating job:", error);
      return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
    }
  }

export async function DELETE(request: NextRequest) {
    try {
      const { pathname } = new URL(request.url);
      const _id = pathname.split('/').pop();
  
      if (!_id) {
        return NextResponse.json({ message: "job ID is required." }, { status: 400 });
      }
      const job  =await itRefJob.findById(new Types.ObjectId(_id))
    

      const deletedjob = await itRefJob.findByIdAndDelete(_id);
  
      if (!deletedjob) {
        return NextResponse.json({ message: "job not found." }, { status: 404 });
      }
  
      return NextResponse.json({ message: "job deleted successfully." }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error deleting job", error }, { status: 500 });
    }
  }


  export  async function POST(request: NextRequest, res: NextResponse) {
    await dbConnect();
  
    const { pathname } = new URL(request.url);
    const jobId = pathname.split('/').pop();
    console.log(jobId);
    
  
    
      try {
          const body = await request.json();
        const { name, email, mobile, resume, currentCompany, noticePeriod } = body;
  
        // Validate required fields
        if (!name || !email || !mobile || !resume) {
          return NextResponse.json({ message: 'Name, Email, Mobile, and Resume are required.' });
        }
  
        // Find the job and add the applicant
        const job = await itRefJob.findById(jobId);
        if (!job) {
          return NextResponse.json({ message: 'Job not found.' });
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
            title: ` Dear ${name} You have successfully applied`,
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
            .otp {
                display: inline-block;
                background-color: #f0f0f0;
                padding: 10px 10px;
                font-size: 25px;
                color: #333333;
                border-radius: 4px;
                margin: 20px 0;
                text-align: center;
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
            <!-- Header Section -->
            <div class="header">
                Shiv Infosec
            </div>
    
            <!-- Content Section -->
            <div class="content">
                Dear <strong>${email}</strong>,  
                <br><br>
                Thank you for choosing Shiv Infosec! Your application has subbmited to Hr:  
               
                <br>
                The Shiv Infosec Team
            </div>
    
            <!-- Footer Section -->
            <div class="footer">
                <p>Visit us at <a href="https://shivinfosec.com">shivinfosec.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `,
          });
    
          if (emailResponse) {
            console.log("Email sent successfully");
            return NextResponse.json({ success: true, message: "OTP sent successfully." });
          } else {
            console.log("Failed to send email");
            return NextResponse.json({ success: false, message: "Failed to send OTP email." });
          }
        } catch (error: any) {
          console.log(error);
          return NextResponse.json({ success: false, message: "Error sending OTP email." });
        }
        return NextResponse.json({ message: 'Application submitted successfully!', job });
      } catch (error :any) {
        return NextResponse.json({ message: 'Server Error', error: error.message });
      }
    } 