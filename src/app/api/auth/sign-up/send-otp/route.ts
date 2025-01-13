/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { User } from "@/models/User";
import otpGenerator from "otp-generator";
import OTP from "@/models/otp";
import mailSender from "@/utils/mailSender";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
    }

    await dbConnect();

    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
    
      return NextResponse.json({ success: false, message: "User already registered." }, { status: 409 });
    }

    let otp: any = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

    let existingOTP = await OTP.findOne({ otp });
    while (existingOTP) {
      otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
      existingOTP = await OTP.findOne({ otp });
    }

    const otpPayload = { email, otp };
    await OTP.create(otpPayload);
    console.log("OTP generated and stored:", otpPayload);

    try {
      const emailResponse = await mailSender({
        email,
        title: "Shiv InfoSec Your OTP Code for Secure Access",
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
            Thank you for choosing Shiv Infosec! To proceed securely, please use the One-Time Password (OTP) below:  
            <div class="otp">
                ${otp}
            </div>
            This code is valid for the next <strong>[Time Limit, e.g., 5 minutes]</strong> and is for one-time use only.  
            <br><br>
            Please do not share this code with anyone to ensure your account's safety.
            <br><br>
            Stay secure,  
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

  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ success: false, message: "Error sending OTP." }, { status: 500 });
  }
}
