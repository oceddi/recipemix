import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { v4 as uuidv4 } from 'uuid';
import Path from 'path';
import { NextRequest } from 'next/server';

export const GET = async function handler(
  req: NextRequest
) {
  const { searchParams } = new URL(req.url || '')
  const name = searchParams.get('file') || '';
  const type = searchParams.get('fileType') || '';

  // File name should be uuid so no collision occurs...
  const filename = uuidv4() + Path.extname(name);

  const s3Client = new S3Client({});

  const post = await createPresignedPost(s3Client, {
    Bucket: process.env.S3_BUCKET_NAME || '',
    Key: filename,
    Fields: {
      'Content-Type': type,
    },
    Expires: 600, // seconds
    Conditions: [
      ['content-length-range', 100, 5*1048576], // up to 5 MB
    ],
  });

  return new Response(JSON.stringify(post), {
      status: 200
  });
};
