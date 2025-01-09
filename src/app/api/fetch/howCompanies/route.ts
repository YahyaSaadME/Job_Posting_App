/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import Job from "@/models/jobs";

export async function GET(request: NextRequest) {
  try {
    // Fetch distinct company names
    const companies = await Job.distinct("company");

    // Get the count of distinct companies
    const companyCount = companies.length;

    return NextResponse.json({
      success: true,
      data: {
        companies,
        count: companyCount,
      },
    });
  } catch (error) {
    console.error("Error fetching company count:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching company count", error },
      { status: 500 }
    );
  }
}
