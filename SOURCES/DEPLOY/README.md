# @encapsule/holistic/SOURCES/DEPLOY/README.md

When `appgen` initializes a new holistic app service project monorepo for the first time it copies the contents of the @encapsule/holistic/SOURCES/* directory tree into the new app service project monorepo's ./SOURCES/* directory tree.

This includes the `./SOURCES/DEPLOYMENT/aws-elastic-beanstalk/` directory that contains a baseline AWS Elastic Beanstalk configuration holistic app service runtime package deployments to Amazon Web Services cloud.

It's this EB configuration that is currently copied into a holistic app service deployment package when a developer evaluates `make appServiceDeployment` target.

