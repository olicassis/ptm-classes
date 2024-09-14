#### 2024-09-14

##### Chores

*  import jest to prevent unwanted namespace bugs (d7d3f597)
*  rename mock files (0dd0f941)
*  rename create profile interface (eb79fada)
*  remove turborepo to work with a monolith (a70cd5ae)
*  remove whitespaces (a4b11110)

##### Continuous Integration

*  update package-lock.json (3e94aefb)
*  enable CI true (1e692fe3)
*  update workflow (5e6760fe)
*  add github workflows (7dcb12db)
*  setup husky and commitlint (48984ec6)
*  forces lint-staged to use package config (a002a137)
*  configure husky pre-commit to lint only staged files (af76c058)
*  configure husky pre-commit to lint the project (f5a79234)
*  reconfig husky (b1649b21)
*  reconfig husky (6167e0e5)
*  remove format from husky (43debde8)
*  add husky and commitlint to the project (37ba3711)

##### Documentation Changes

*  update docs to reflect current status (be9b64cc)
*  add swagger documentation for all routes (173efe1d)
*  add swagger documentation for post class request route (e48f5b1a)
*  update changelog (ac733bf5)
*  add api docs for get routes (cac14ca3)
*  update changelog (21545988)
*  add swagger to the project (83db9fdc)
*  add changelog (d92ec5c6)
*  update README.md (f4787e4b)

##### New Features

*  add route to verify profile (5c124543)
*  add route to create a class request (1ad729db)
*  add route to create a profile schedule (7f9e59fe)
*  add route to create a subject for a given profile (e3478711)
*  add route to create profile (8805f325)
*  add route to get profile schedules (e9fee1a5)
*  add route to get profile subjects (fabf0031)
*  add route to get profile by id (08845ecb)
*  add route to get all profiles (c33f9655)
*  add db check on healthcheck route (700c6f56)
*  add basic healthcheck on Dockerfile (6e8e31a3)
*  integrating Dockerfile and docker-compose to run the app in the container (a2d1eb25)
*  add healthcheck route (b021fdb8)
*  add seeds for existing entities (35bc92fd)
*  add migration for ClassRequest entity (c7ee26ae)
*  add profile schedule and subject migrations (618f4f3f)
*  add migration for Profile entity (c0e4e22c)
*  add docker-compose for postgresql from alpine (1c9f3bd8)
* **create-turbo:**
  *  apply package-manager transform (9fdae883)
  *  apply official-starter transform (d6552476)

##### Bug Fixes

*  nodemon setup (a63a76b2)
*  correct profile schedule status not updated message (c3a23bd3)
*  remove mock-typeorm package (67205310)
*  corrects tests to check for adequate abstractions (1f126a42)
*  implement correct abstractions tests on create schedule route (61943186)
*  remove unnecessary conditions (df88aa55)
*  update mock-typeorm to latest for empty object bug fix (4cd62963)
*  wrong message on get profile subject controller (9d07f5ed)
*  error validation logic (24c0dfe1)
*  add missing toLowerCase for label input (fd93ea1e)
*  add index to migrations ensuring unique constraints (12edff25)
*  enum types default values (123829e4)
*  app and database initialization (7c1b5818)
*  docker standards (72c3d679)
*  docker context (37e2a71c)
*  nodemon config and missing package (7e13ca23)
*  docker-compose errors (700cf808)
*  add missing turbo package (44db59a8)

##### Other Changes

*  setup app (5b76db46)
*  add db package with v1 of ptm database (273be5aa)
*  enable CI true" (4176cad6)
*  reconfig husky" (91768d82)
*  reconfig husky" (94a3068c)
*  testing husky" (3bf561c8)
*  testing husky (628afbf0)
*  testing husky" (a0c21fa6)
*  testing husky (74884f65)
*  setting up jest (641d7ff9)
*  remove format script (73ab3dac)
*  setting up monorepo (5f146a5e)

##### Refactors

*  adjust get profile route (c11e82f3)

##### Tests

*  add missing test for create class request route (08858c56)
*  add tests for verify profile route (7bfe95af)
*  add tests for create class request route (257c554f)
*  add tests for create profile schedule route (cd89c4ba)
*  add tests for create profile subject route (7c9f9061)
*  add tests for post profile route (303ecc27)
*  add tests for get profile schedules route (8b7609e9)
*  add tests for get profile subjects route (d6e3b773)
*  add tests for get profile by id route (ee601477)
*  add tests for get profiles route (6d68552c)
*  add tests for healthcheck route (7867ff58)

#### 2024-08-15

##### Chores

*  remove turborepo to work with a monolith (a70cd5ae)
*  remove whitespaces (a4b11110)

##### Continuous Integration

*  enable CI true (1e692fe3)
*  update workflow (5e6760fe)
*  add github workflows (7dcb12db)
*  setup husky and commitlint (48984ec6)
*  forces lint-staged to use package config (a002a137)
*  configure husky pre-commit to lint only staged files (af76c058)
*  configure husky pre-commit to lint the project (f5a79234)
*  reconfig husky (b1649b21)
*  reconfig husky (6167e0e5)
*  remove format from husky (43debde8)
*  add husky and commitlint to the project (37ba3711)

##### Documentation Changes

*  add api docs for get routes (cac14ca3)
*  update changelog (21545988)
*  add swagger to the project (83db9fdc)
*  add changelog (d92ec5c6)
*  update README.md (f4787e4b)

##### New Features

*  add route to get profile schedules (e9fee1a5)
*  add route to get profile subjects (fabf0031)
*  add route to get profile by id (08845ecb)
*  add route to get all profiles (c33f9655)
*  add db check on healthcheck route (700c6f56)
*  add basic healthcheck on Dockerfile (6e8e31a3)
*  integrating Dockerfile and docker-compose to run the app in the container (a2d1eb25)
*  add healthcheck route (b021fdb8)
*  add seeds for existing entities (35bc92fd)
*  add migration for ClassRequest entity (c7ee26ae)
*  add profile schedule and subject migrations (618f4f3f)
*  add migration for Profile entity (c0e4e22c)
*  add docker-compose for postgresql from alpine (1c9f3bd8)
* **create-turbo:**
  *  apply package-manager transform (9fdae883)
  *  apply official-starter transform (d6552476)

##### Bug Fixes

*  app and database initialization (7c1b5818)
*  docker standards (72c3d679)
*  docker context (37e2a71c)
*  nodemon config and missing package (7e13ca23)
*  docker-compose errors (700cf808)
*  add missing turbo package (44db59a8)

##### Other Changes

*  setup app (5b76db46)
*  add db package with v1 of ptm database (273be5aa)
*  enable CI true" (4176cad6)
*  reconfig husky" (91768d82)
*  reconfig husky" (94a3068c)
*  testing husky" (3bf561c8)
*  testing husky (628afbf0)
*  testing husky" (a0c21fa6)
*  testing husky (74884f65)
*  setting up jest (641d7ff9)
*  remove format script (73ab3dac)
*  setting up monorepo (5f146a5e)

##### Refactors

*  adjust get profile route (c11e82f3)

##### Tests

*  add tests for get profile schedules route (8b7609e9)
*  add tests for get profile subjects route (d6e3b773)
*  add tests for get profile by id route (ee601477)
*  add tests for get profiles route (6d68552c)
*  add tests for healthcheck route (7867ff58)

#### 2024-08-09

##### Chores

*  remove turborepo to work with a monolith (a70cd5ae)
*  remove whitespaces (a4b11110)

##### Continuous Integration

*  enable CI true (1e692fe3)
*  update workflow (5e6760fe)
*  add github workflows (7dcb12db)
*  setup husky and commitlint (48984ec6)
*  forces lint-staged to use package config (a002a137)
*  configure husky pre-commit to lint only staged files (af76c058)
*  configure husky pre-commit to lint the project (f5a79234)
*  reconfig husky (b1649b21)
*  reconfig husky (6167e0e5)
*  remove format from husky (43debde8)
*  add husky and commitlint to the project (37ba3711)

##### Documentation Changes

*  add swagger to the project (83db9fdc)
*  add changelog (d92ec5c6)
*  update README.md (f4787e4b)

##### New Features

*  add db check on healthcheck route (700c6f56)
*  add basic healthcheck on Dockerfile (6e8e31a3)
*  integrating Dockerfile and docker-compose to run the app in the container (a2d1eb25)
*  add healthcheck route (b021fdb8)
*  add seeds for existing entities (35bc92fd)
*  add migration for ClassRequest entity (c7ee26ae)
*  add profile schedule and subject migrations (618f4f3f)
*  add migration for Profile entity (c0e4e22c)
*  add docker-compose for postgresql from alpine (1c9f3bd8)
* **create-turbo:**
  *  apply package-manager transform (9fdae883)
  *  apply official-starter transform (d6552476)

##### Bug Fixes

*  docker standards (72c3d679)
*  docker context (37e2a71c)
*  nodemon config and missing package (7e13ca23)
*  docker-compose errors (700cf808)
*  add missing turbo package (44db59a8)

##### Other Changes

*  setup app (5b76db46)
*  add db package with v1 of ptm database (273be5aa)
*  enable CI true" (4176cad6)
*  reconfig husky" (91768d82)
*  reconfig husky" (94a3068c)
*  testing husky" (3bf561c8)
*  testing husky (628afbf0)
*  testing husky" (a0c21fa6)
*  testing husky (74884f65)
*  setting up jest (641d7ff9)
*  remove format script (73ab3dac)
*  setting up monorepo (5f146a5e)

##### Tests

*  add tests for healthcheck route (7867ff58)

#### 2024-07-13

##### Chores

*  remove whitespaces (a4b11110)

##### Continuous Integration

*  add github workflows (7dcb12db)
*  setup husky and commitlint (48984ec6)
*  forces lint-staged to use package config (a002a137)
*  configure husky pre-commit to lint only staged files (af76c058)
*  configure husky pre-commit to lint the project (f5a79234)
*  reconfig husky (b1649b21)
*  reconfig husky (6167e0e5)
*  remove format from husky (43debde8)
*  add husky and commitlint to the project (37ba3711)

##### Documentation Changes

*  update README.md (f4787e4b)

##### New Features

* **create-turbo:**
  *  apply package-manager transform (9fdae883)
  *  apply official-starter transform (d6552476)

##### Other Changes

*  reconfig husky" (91768d82)
*  reconfig husky" (94a3068c)
*  testing husky" (3bf561c8)
*  testing husky (628afbf0)
*  testing husky" (a0c21fa6)
*  testing husky (74884f65)
*  setting up jest (641d7ff9)
*  remove format script (73ab3dac)
*  setting up monorepo (5f146a5e)

