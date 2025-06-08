import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

// 업로드된 파일을 저장할 디렉토리
const UPLOAD_DIR = join(process.cwd(), 'uploads')

// AWS S3 설정
/*
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!
*/

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { message: '파일이 없습니다.' },
        { status: 400 }
      )
    }

    // 파일 데이터를 ArrayBuffer로 변환
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 파일 저장 경로 생성
    const fileName = `${Date.now()}-${file.name}`
    const filePath = join(UPLOAD_DIR, fileName)

    // 로컬 파일 시스템에 저장
    await writeFile(filePath, buffer)

    // AWS S3에 파일 업로드
    /*
    try {
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `uploads/${fileName}`,
        Body: buffer,
        ContentType: file.type,
        Metadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString()
        }
      })

      await s3Client.send(command)

      // S3 URL 생성
      const s3Url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`

      return NextResponse.json({
        success: true,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        localPath: filePath,
        s3Url: s3Url
      })
    } catch (s3Error) {
      console.error('S3 업로드 오류:', s3Error)
      // S3 업로드 실패 시에도 로컬 파일은 유지
    }
    */

    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      savedPath: filePath
    })
  } catch (error) {
    console.error('파일 업로드 처리 중 오류:', error)
    return NextResponse.json(
      { message: '파일 업로드 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 