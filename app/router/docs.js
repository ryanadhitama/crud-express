const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    description: 'CRUD Express Documentation',
    version: '1.0.0',
    title: 'CRUD Express',
    contact: {
      email: 'ryanadhitama2@gmail.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:8000/v1',
      description: 'Localhost'
    }
  ],
  components: {
    responses: {
      InvalidPayload: {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      NotFound: {
        description: 'Not Found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      ServerError: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      }
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          status: {
            type: 'boolean'
          },
          message: {
            type: 'string'
          }
        }
      },
      Meta: {
        type: 'object',
        properties: {
          page: {
            type: 'number'
          },
          page_size: {
            type: 'number'
          },
          page_count: {
            type: 'number'
          },
          total: {
            type: 'number'
          },
          has_next: {
            type: 'boolean'
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./app/controllers/*.js', './app/models/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
