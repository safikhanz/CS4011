const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "My application's API Document",
    description: "This is how you use my application!",
    termsOfService: "Nah",
    contact: {
      name: "Safi khan",
      email: "sskkn7@mail.umsl.edu",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  host: "localhost:3000",
  basePath: "",
  tags: [
    {
      name: "Users",
      description: "API for users  in the system",
    },
    {
      name: "Posts",
      description: "API for users and their posts in the system",
    },
  ],
  paths: {
    "/allposts": {
      get: {
        tags: ["Posts"],

        summary: "Get all posts of all users",
        responses: {
          "200": {
            description: "200 - ok - got all the posts",

            content: {
              "application/json": {
                example: {
                  _id: "5e9fcda69ebf5c2a2d0e187a",
                  userId: 1,
                  id: 8,
                  title: "dolorem dolore est ipsam",
                  body:
                    "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
                },
              },
            },
          },
        },
      },
    },
    "/allpost/<username>": {
      get: {
        tags: ["Users"],
        summary: "Get all posts based on their username",
        consumes: "application/json",
        produces: "application/json",
        requestBody: {
          description: "an array of names to send",
          required: false,
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "string",
                  example: "Leslie Knope",
                },
              },
            },
          },
        },

        responses: {
          "200": {
            description: "A response with the desired characters and actors",
          },
        },
      },
    },

    "/profile/<username>": {
      get: {
        tags: ["Users"],
        summary: "Get all posts based on their username",
        consumes: "application/json",
        produces: "application/json",
        requestBody: {
          description: "an array of names to send",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "string",
                  example: "Leslie Knope",
                },
              },
            },
          },
        },

        responses: {
          "200": {
            description: "A response with the desired characters and actors",
          },
        },
      },
    },
    "/posts/<postId>": {
      get: {
        tags: ["Posts"],
        summary: "Get all posts based on their postID",
        operationId: "getPostById",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of the post to return",
            required: true,
            schema: {
              type: "number",
            },
          },
        ],

        responses: {
          "400": {
            description: "Invalid postID supplied",
            content: {},
          },
          "404": {
            description: "Post not found",
            content: {},
          },
          "200": {
            description: "Successfully retrieved the post",
            content: {},
          },
        },
      },
      delete: {
        tags: ["Posts"],
        summary: "Delete post",
        description: "delete posts by user Id.",
        operationId: "deletepost",
        parameters: [
          {
            name: "postId",
            in: "path",
            description: "The post that needs to be deleted",
            required: true,
            schema: {
              type: "number",
            },
          },
        ],
        responses: {
          "400": {
            description: "Invalid postID supplied",
            content: {},
          },
          "404": {
            description: "Post not found",
            content: {},
          },
          "200": {
            description: "Successfully deleted the post",
            content: {},
          },
        },
      },
    },

    // use this for /post
    "/posts": {
      post: {
        tags: ["Posts"],
        summary: "Add new posts to the user",
        consumes: "application/json",
        produces: "application/json",
        requestBody: {
          description: "Post object that needs to be added to the database",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Posts",
              },
            },
            "application/xml": {
              schema: {
                $ref: "#/components/schemas/Posts",
              },
            },
          },
          required: true,
        },

        responses: {
          "200": {
            description: "Successfully added the following post",
          },
        },
      },
    },

    "/posts/<id>": {
      patch: {
        tags: ["Posts"],
        summary: "Add new posts to the user",
        consumes: "application/json",
        produces: "application/json",
        requestBody: {
          description: "Post object that needs to be added to the database",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Posts",
              },
            },
            "application/xml": {
              schema: {
                $ref: "#/components/schemas/Posts",
              },
            },
          },
          required: true,
        },

        responses: {
          "200": {
            description: "A response with the desired characters and actors",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Posts: {
        required: ["userId", "id", "title", "body"],
        type: "object",
        properties: {
          userId: {
            type: "number",
            example: "99",
          },
          id: {
            type: "number",
            example: "123",
          },
          title: {
            type: "string",
            example: "Swagger Title",
          },

          body: {
            type: "string",
            example: "Lorem ipsum dolor sit amet, aliquip convenire est et.",
          },
        },
      },

      User: {
        required: ["name", "id", "username", "email", "phone"],
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          username: {
            type: "string",
          },
          name: {
            type: "string",
          },

          email: {
            type: "string",
          },

          phone: {
            type: "string",
          },

          website: {
            type: "string",
          },
          company: {
            type: "string",
            example: "name, catchphrase , bs",
          },
          address: {
            type: "string",
          },
        },
        xml: {
          name: "User",
        },
      },
    },
  },
};

module.exports = swaggerDocument;
