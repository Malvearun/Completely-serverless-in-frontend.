{
  "Version":"2012-10-17",
  "Statement": [
    {
	"Effect": "Allow",
	"Principal": {
		"AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity OAI-ID"
		},
	"Action": "s3:GetObject",
	"Resource": "arn:aws:s3:::AWSDOC-EXAMPLE-BUCKET/*"
}
