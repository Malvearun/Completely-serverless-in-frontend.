# Completely-Serverless-In-Frontend.

## S3-CloudFront

### Why Serverless?
•	No server to manage
•	Scaling & HA: How will be scaling will be handled, depends upon the request usage by the provider. No additional charges are to be paid.
•	Lower cost: If no request coming in, there is no cost to be paid.
•	Quick deployment and updates.
•	Pay-as-you-go model
•	Event/microservices architectures

### Serverless Architectures:

•	Frond End
•	Application
•	Data Persistence

Serverless data layer: Aurora DB and DynamoDB

### Limitation:
•	lack of testing and debugging
•	security concerns, complains with security and policies
•	long-running process ca be ramp up with small, cost is built on the time of the request.
•	Cold start time


AWS is offering AWS lambda, to run on docker machine. It is getting better over time.
Get the cost benefits, flexibility benefits using serverless applications.


#### Front End services:

Completely serverless in frontend.

Configure an Amazon CloudFront distribution to serve HTTPS requests for my Amazon Simple Storage Service (Amazon S3).

**User** &rarr; **www** &rarr; **AWS CloudFront** &rarr; **S3 website**

•	CloudFront: 
1.	It is a content delivery network of edge locations
2.	Caching files from low latency, DDoS protection.
3.	Integrate well with AWS S3.
4.	Offers HTTPs termination via ACM service which manages SSL certificates.
5.	Programmatic access via SDK/APIs

•	S3 Website:
1.	Scalable
2.	Integration with AWS CloudFront
3.	Programmatic access via SDK/APIs
4.	Integrate well with AWS Route 53 NS
5.	For individual web pages or client-side scripts

### Front-End Serverless: S3 and CloudFront

•	S3 static website: with fixed content, shows the same content to all viewers.
•	S3 Static website bucket: Bucket enabled to allow it to host content.
•	S3 website url is not same has the s3 website bucket.
•	Publicly readable: content hosted by S3 bucket
•	Server-side code execution, because there is no backend server.
•	Policies for S3 and ACL’s will apply with read access for public content in S3 bucket.

#### Steps for creation of S3 bucket:

•	Login to AWS console and create a new bucket with a unique name `test-front-end-bucket-7685678456`  
•	next window Configure options with properties, versioning, tags, object level logging leave has default. 

•	Set permissions > check only `two ACL’s` first two of the 4 properties.
•	Review and create the bucket.

Click on the name of the bucket and click on` properties` tab > `Static website hosting`  
1.	`Index document`: Content to serve when someone browse > save
•	Permission tab > `bucket policy` from file `bucket-policy.js` > paste the policy and `save`

Reference link: [bucket-policies](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html) 


1.	Note: Will give a waring saying publicly accessible.
•	Under `Overview` tab click on `upload` > click on `Add files`  or may `drag and drop files` >  `index.html`  >  `keep all the defaults ` > 
1.	 Manage users with read and write permissions on bucket > for now select the `standard tier` and click `next`
2.	Review and `upload` 

•	Head back to `properties` tab > `Static website hosting` > click on the endpoint S3 `link`, should see the page displayed the content.

### CloudFront as an HTTPS endpoint for the S3 bucket

•	CloudFront is the worldwide group of edge caching.
•	While creating the CloudFront distribution it might take up to 20 minutes to sync across the globe.
•	CloudFront provides default SSL certificates can be used for HTTPS, however there is a possibility of uploading custom certificates and route to CloudFront from a DNS such as Route53.

#### Steps for CloudFront:

•	AWS console > services > CloudFront > Create Distribution / Get started. Before this we will create `OAI`.
•	`Security`  > `Origin access Identity` (OAI) > `Create` > `MyOAI-S3`
•	`Create Distribution` > we are creating `web` for this project `Get started` > 
1.	Origin Domain Name: S3 link should be prepopulated, so select `test-front-end-bucket-7685678456`.
2.	Restriction Access: `Yes`
a.	Origin Access Identity: use an existing identity: `MyOAI-S3`
b.	Grant Read Permission on bucket: `No`
•	Default Cache Behaviour Settings:
1.	Viewer Protocol policy: `Redirect HTTP to HTTPS`
2.	Allow HTTP Methods: `GET, HEAD`
3.	Keep all other properties has `default`.
•	Distribution Settings:
1.	SSL Certificate: `Default CloudFront Certificate`
2.	Default Root Object: `index.html`
•	Create distribution > should see it will be `in progress` under status of creation.

##### Head back to S3 bucket to modify the policy, so CloudFront distribution has OAI can access the objects within the bucket.

1.	Under `permissions` > `bucket policy` from `cloudfront-access-to-amazon-s3` > 
Only changes under `Principal` section.

`{

    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
            		"AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity EAF5XXXXXXXXX"
		        },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::test-front-end-bucket-7685678456909/*"
        }
    ]
    
}`

Reference: [cloudfront-access-to-amazon-s3](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-access-to-amazon-s3/) 

•	Head back to CloudFront and check the distribution status has `Deployed` .
•	Click on the ID of distribution and look for `Domain Name` of distribution: copy
•	Paste the Domain Name in the browser to check if it works. Secured at this point.
•	From S3 endpoint link, should be able to access the content anymore - `Access Denied` expected behaviour. Has OAI ID is been mentioned in bucket policy to access content within the bucket.
