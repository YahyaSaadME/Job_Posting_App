// /app/api/jobs/[jobId]/applicants/route.ts

import { NextResponse } from 'next/server';
import itRefJob from '../../../../../models/itRefJob'; // Make sure the path is correct for your model

export async function GET(request: Request) {

  const { pathname } = new URL(request.url);
  console.log('Extracted Path:', pathname);
  const jobId : any = pathname.split('/').pop();

  try {
    // Fetch the job by jobId and get applicants
    const job = await itRefJob.findById(jobId, 'applicants'); // Only fetch the 'applicants' field
    
    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job.applicants);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    return NextResponse.error();
  }
}
