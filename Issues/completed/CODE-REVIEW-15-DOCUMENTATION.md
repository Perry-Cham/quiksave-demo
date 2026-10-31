# Issue 15: Create Comprehensive API Documentation & Examples

**Title:** Add OpenAPI/Swagger Documentation & API Examples

**Problem:** API endpoints lack clear documentation:
- No parameter descriptions
- No example requests/responses
- No error documentation
- No authentication documentation
- Difficult for frontend to integrate

**Impact:**
- Onboarding difficulty for new developers
- Integration errors
- **SOLID Single Responsibility** - documentation should be separate from code

**Goal:** Generate and maintain comprehensive API documentation.

**Acceptance Criteria:**

- ✅ Create OpenAPI 3.0 specification
- ✅ Document all endpoints (methods, parameters, responses)
- ✅ Include authentication requirements
- ✅ Provide error response examples
- ✅ Host Swagger UI for interactive docs
- ✅ Keep docs in sync with code
- ✅ Example cURL commands for each endpoint

**Setup:**

```bash
pnpm add -D @nestjs/swagger swagger-ui-express
```

**OpenAPI Spec:**

```yaml
# openapi.yaml
openapi: 3.0.0
info:
  title: Quicksave API
  description: Product and category management API
  version: 1.0.0
  contact:
    name: API Support
    email: support@quicksave.com

servers:
  - url: http://localhost:3000/api
    description: Development server
  - url: https://api.quicksave.com
    description: Production server

paths:
  /getproducts/{category}:
    get:
      summary: Get all products in a category
      operationId: getProducts
      parameters:
        - name: category
          in: path
          required: true
          schema:
            type: string
            enum: [beef, pork, chicken, processed]
          description: Product category
      responses:
        '200':
          description: List of products
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Product'
                  timestamp:
                    type: string
                    format: date-time
              example:
                success: true
                data:
                  - _id: '507f1f77bcf86cd799439011'
                    name: Prime Ribeye
                    price: 29.99
                    category: beef
                    image: https://ik.imagekit.io/...
                timestamp: '2024-01-15T10:30:00Z'
        '400':
          $ref: '#/components/responses/BadRequest'
        '500':
          $ref: '#/components/responses/InternalError'

  /addproduct/{category}:
    post:
      summary: Create a new product
      operationId: addProduct
      security:
        - bearerAuth: []
      parameters:
        - name: category
          in: path
          required: true
          schema:
            type: string
            enum: [beef, pork, chicken, processed]
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              required:
                - name
                - price
                - subcategory
              properties:
                name:
                  type: string
                  minLength: 1
                  maxLength: 100
                  example: Prime Ribeye
                price:
                  type: number
                  format: float
                  minimum: 0.01
                  example: 29.99
                subcategory:
                  type: string
                  maxLength: 100
                  example: Ribeye
                imageFile:
                  type: string
                  format: binary
                  description: Product image (max 5MB, JPEG/PNG/WebP)
      responses:
        '201':
          description: Product created successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  data:
                    $ref: '#/components/schemas/Product'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/InternalError'

components:
  schemas:
    Product:
      type: object
      required:
        - _id
        - name
        - price
        - category
      properties:
        _id:
          type: string
          format: uuid
          example: '507f1f77bcf86cd799439011'
        name:
          type: string
          example: Prime Ribeye
        price:
          type: number
          format: float
          example: 29.99
        category:
          type: string
          enum: [beef, pork, chicken, processed]
        subcategory:
          type: string
          example: Ribeye
        image:
          type: string
          format: uri
          example: https://ik.imagekit.io/quicksave/...
        imageId:
          type: string
          example: '507f1f77bcf86cd799439012'

    ErrorResponse:
      type: object
      required:
        - success
        - error
      properties:
        success:
          type: boolean
          enum: [false]
        error:
          type: object
          required:
            - code
            - message
          properties:
            code:
              type: string
              example: VALIDATION_ERROR
            message:
              type: string
              example: Invalid request data
            details:
              type: object
              nullable: true

  responses:
    BadRequest:
      description: Invalid request
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    Unauthorized:
      description: Authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    InternalError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Authentication token from better-auth
```

**API Documentation Examples:**

```markdown
# API Documentation

## Get Products

Get all products in a specific category.

**Request:**
```bash
curl -X GET http://localhost:3000/api/getproducts/beef \
  -H "Content-Type: application/json"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Prime Ribeye",
      "price": 29.99,
      "category": "beef",
      "subcategory": "Ribeye",
      "image": "https://ik.imagekit.io/quicksave/...",
      "imageId": "507f1f77bcf86cd799439012"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Add Product

Create a new product with image upload.

**Request:**
```bash
curl -X POST http://localhost:3000/api/addproduct/beef \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=Prime Ribeye" \
  -F "price=29.99" \
  -F "subcategory=Ribeye" \
  -F "imageFile=@/path/to/image.jpg"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Prime Ribeye",
    "price": 29.99,
    "category": "beef",
    "subcategory": "Ribeye",
    "image": "https://ik.imagekit.io/quicksave/...",
    "imageId": "507f1f77bcf86cd799439012"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Error Response (401 Unauthorized):**
```json
{
  \"success\": false,
  \"error\": {
    \"code\": \"UNAUTHORIZED\",
    \"message\": \"Authentication required\"
  },
  \"timestamp\": \"2024-01-15T10:30:00Z\"
}
```
```

**Benefits:**
- Clear API contracts
- Easier frontend integration
- Better onboarding for new developers
- Self-documenting with Swagger UI
- Can generate client SDKs
