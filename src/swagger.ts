import dotenv from 'dotenv'
import swaggerAutogen from 'swagger-autogen'

dotenv.config()

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'PTM Classes API',
    description: 'Implementation of PTM Classes API with TypeScript',
  },
  servers: [
    {
      url: `${process.env.APP_URL}:${process.env.APP_PORT}/api`,
      description: 'PTM Classes Server',
    },
  ],
  components: {
    schemas: {
      createClassRequestBody: {
        $studentProfileId: '6eb242f5-f76e-4097-89c7-5bc7127d9f6b',
        $profileScheduleId: 'aad8ffac-f2a6-457f-ad87-33ed287c924a',
      },
      createClassRequestSuccessfulResponse: {
        $message: 'Class Request',
        $classRequest: {
          $id: '31ab886c-d65b-485f-bf32-0a9fd6789fba',
          $studentProfileId: '6eb242f5-f76e-4097-89c7-5bc7127d9f6b',
          $profileScheduleId: 'aad8ffac-f2a6-457f-ad87-33ed287c924a',
          createdAt: '2024-06-07T22:53:26.753803',
          updatedAt: '2024-10-05T22:53:26.753840',
          deletedAt: '2024-10-30T22:53:26.753851',
        },
      },
      createClassRequestProfileNotFoundResponse: {
        $message: 'Profile not found',
      },
      createClassRequestNotStudentProfileResponse: {
        $message: 'Profile must have STUDENT role',
      },
      createClassRequestInternalServerErrorResponse: {
        $message: 'Could not create class request',
      },
    },
  },
}

const outputFile = './swagger_output.json'
const endpointsFiles = [
  './routes/healthcheck.ts',
  './routes/profile.ts',
  './routes/schedule.ts',
  './routes/subject.ts',
  './routes/classRequest.ts',
]

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
