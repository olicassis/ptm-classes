import dotenv from 'dotenv'
import swaggerAutogen from 'swagger-autogen'

dotenv.config()

const schemas = {
  classRequest: {
    $id: '31ab886c-d65b-485f-bf32-0a9fd6789fba',
    $studentProfileId: '6eb242f5-f76e-4097-89c7-5bc7127d9f6b',
    $profileScheduleId: 'aad8ffac-f2a6-457f-ad87-33ed287c924a',
    createdAt: '2024-06-07T22:53:26.753803',
    updatedAt: '2024-10-05T22:53:26.753840',
    deletedAt: '2024-10-30T22:53:26.753851',
  },
  subject: {
    $id: '1d858051-27fc-40cd-bc5d-79871610483b',
    $profileId: 'cf233a74-a26c-45bc-915f-a6363dd1ecd2',
    $label: 'math',
    createdAt: '2024-06-12T22:53:26.753803',
    updatedAt: '2024-10-20T22:53:26.753840',
    deletedAt: '2024-10-27T22:53:26.753851',
  },
  schedule: {
    $id: '065fc17e-e0ce-43cb-929c-932f52a86cff',
    $profileId: 'cf233a74-a26c-45bc-915f-a6363dd1ecd2',
    $date: '2024-10-27T22:53:26.753851',
    $status: 'available',
    createdAt: '2024-06-13T22:53:26.753803',
    updatedAt: '2024-10-21T22:53:26.753840',
    deletedAt: '2024-10-28T22:53:26.753851',
  },
  profile: {
    $id: '9771c7d9-9ee7-418e-bf27-5d6d35dc7ccb',
    $firstName: 'Kelvin',
    $lastName: 'Green',
    $avatar: 'https://avatars.dicebear.com/api/bottts/example.svg',
    $username: 'kgreen',
    $role: 'teacher',
    $status: 'verified',
    createdAt: '2024-08-12T22:53:26.753803',
    updatedAt: '2024-09-20T22:53:26.753840',
    deletedAt: '2024-12-27T22:53:26.753851',
  },
}

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
        $data: schemas.classRequest,
      },
      profileNotFoundResponse: {
        $message: 'Profile not found',
      },
      notStudentProfileResponse: {
        $message: 'Profile must have STUDENT role',
      },
      notTeacherProfileResponse: {
        $message: 'Profile must have TEACHER role',
      },
      createClassRequestInternalServerErrorResponse: {
        $message: 'Could not create class request',
      },
      healthcheckSuccessfulResponse: {
        $message: 'App is fine!',
      },
      healthcheckInternalServerErrorResponse: {
        $message: 'Internal Server Error',
      },
      scheduleDateMustBeInTheFutureResponse: {
        $message: 'A schedule date must be in the future',
      },
      overlappingSchedulesResponse: {
        $message:
          'Could not create schedule! Provided date overlaps with existing schedules',
      },
      createScheduleRequestBody: {
        $profileId: schemas.schedule.$profileId,
        $date: schemas.schedule.$date,
      },
      createProfileScheduleSuccessfulResponse: {
        $message: 'Profile Schedule',
        $data: schemas.schedule,
      },
      createProfileScheduleInternalServerErrorResponse: {
        $message: 'Could not create schedule',
      },
      createSubjectRequestBody: {
        $profileId: schemas.subject.$profileId,
        $label: schemas.subject.$label,
      },
      createProfileSubjectSuccessfulResponse: {
        $message: 'Profile Subject',
        $data: schemas.subject,
      },
      createProfileSubjectInternalServerErrorResponse: {
        $message: 'Could not create subject',
      },
      getAllProfilesSuccessfulResponse: {
        $message: 'Profiles',
        $data: [schemas.profile],
      },
      getProfilesInternalServerErrorResponse: {
        $message: 'Could not get profiles',
      },
      getProfileSuccessfulResponse: {
        $message: 'Profile',
        $data: schemas.profile,
      },
      getProfileInternalServerErrorResponse: {
        $message: 'Could not get profile',
      },
      getAllProfileSubjectsSuccessfulResponse: {
        $message: 'Profile Subjects',
        $data: [schemas.subject],
      },
      getProfileSubjectsInternalServerErrorResponse: {
        $message: 'Could not get profile subjects',
      },
      getAllProfileSchedulesSuccessfulResponse: {
        $message: 'Profile Schedules',
        $data: [schemas.schedule],
      },
      getProfileSchedulesInternalServerErrorResponse: {
        $message: 'Could not get profile schedules',
      },
      createProfileRequestBody: {
        $firstName: schemas.profile.$firstName,
        $lastName: schemas.profile.$lastName,
        avatar: schemas.profile.$avatar,
        $username: schemas.profile.$username,
        role: {
          '@enum': ['teacher', 'student'],
        },
      },
      createProfileSuccessfulResponse: {
        $message: 'Profile',
        $data: schemas.profile,
      },
      createProfileInternalServerErrorResponse: {
        $message: 'Could not create profile',
      },
      verifyProfileInternalServerErrorResponse: {
        $message: 'Cound not verify profile',
        $data: {
          $success: false,
        },
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
