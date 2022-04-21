import { AWS } from "@serverless/typescript/index";

const S3Buckets: AWS["resources"]["Resources"] = {
  FrontendS3Bucket: {
    Type: "AWS::S3::Bucket",
    Properties: {
      BucketName: "${self:custom.websiteBucket}",
      AccessControl: "PublicRead",
      WebsiteConfiguration: {
        IndexDocument: "index.html",
        ErrorDocument: "index.html",
      },
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedHeaders: ["*"],
            AllowedMethods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
            AllowedOrigins: ["*"],
            ExposedHeaders: [
              "x-amz-server-side-encryption",
              "x-amz-request-id",
              "x-amz-id-2",
              "ETag",
            ],
          },
        ],
      },
    },
  },
  FrontendS3BucketPolicy: {
    Type: "AWS::S3::BucketPolicy",
    Properties: {
      Bucket: { Ref: "FrontendS3Bucket" },
      PolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: "*",
            Action: "s3:GetObject",
            Resource: {
              "Fn::Join": [
                "/",
                [{ "Fn::GetAtt": ["FrontendS3Bucket", "Arn"] }, "*"],
              ],
            },
          },
        ],
      },
    },
  },

  AssetS3Bucket: {
    Type: "AWS::S3::Bucket",
    Properties: {
      BucketName: "${self:custom.assetBucket}",
      AccessControl: "BucketOwnerFullControl",
      CorsConfiguration: {
        CorsRules: [
          {
            AllowedHeaders: ["*"],
            AllowedMethods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
            AllowedOrigins: ["*"],
            ExposedHeaders: [
              "x-amz-server-side-encryption",
              "x-amz-request-id",
              "x-amz-id-2",
              "ETag",
            ],
          },
        ],
      },
    },
  },

  AssetS3BucketPolicy: {
    Type: "AWS::S3::BucketPolicy",
    Properties: {
      Bucket: { Ref: "AssetS3Bucket" },
      PolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: "*",

            Action: "s3:GetObject",

            Resource: {
              "Fn::Join": [
                "/",
                [{ "Fn::GetAtt": ["AssetS3Bucket", "Arn"] }, "*"],
              ],
            },
          },
        ],
      },
    },
  },
};

export default S3Buckets;
