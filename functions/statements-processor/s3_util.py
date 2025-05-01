import boto3
import io


def get_file_buffer(bucket_name, key):
    """
    Get S3 object and returns it as a buffer.

    Args:
        bucket_name (str): S3 bucket name.
        key (str): S3 object key (path inside the bucket).

    Returns:
        io.BytesIO: The file content as a buffer.
    """
    s3_client = boto3.client("s3")
    try:
        # Fetch the object from S3
        response = s3_client.get_object(Bucket=bucket_name, Key=key)

        # Read the file content into a buffer
        file_buffer = io.BytesIO(response["Body"].read())
        print(f"✅ Fetched {key} into buffer")
        return file_buffer
    except Exception as e:
        print(f"❌ Failed to fetch {key}: {str(e)}")
        raise
