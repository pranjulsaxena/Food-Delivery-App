import swaggerJsdoc from "swagger-jsdoc";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food Delivery API",
      version: "1.0.1",
      description: "API documentation for the Food Delivery application.",
    },
    servers: [{ url: `http://localhost:${process.env.PORT}` },{url:"https://instafood-99o4.onrender.com"}],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description:
            "JWT stored in HTTP-only cookie named `token` used for authentication",
        },
      },
      schemas: {
        UserResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Operation successful." },
            user: {
              type: "object",
              properties: {
                _id: { type: "string", example: "60d0fe4f5311236168a109ca" },
                fullName: { type: "string", example: "John Doe" },
                email: { type: "string", example: "john.doe@example.com" },
                contact: { type: "number", example: 9876543210 },
                address: { type: "string", example: "123 Main St" },
                city: { type: "string", example: "New York" },
                country: { type: "string", example: "USA" },
                profilePicture: {
                  type: "string",
                  example: "https://example.com/profile.jpg",
                },
                admin: { type: "boolean", example: false },
                lastlogin: {
                  type: "string",
                  format: "date-time",
                  example: "2025-07-29T18:30:00Z",
                },
                isVerified: { type: "boolean", example: true },
                createdAt: {
                  type: "string",
                  format: "date-time",
                  example: "2025-07-01T12:00:00Z",
                },
                updatedAt: {
                  type: "string",
                  format: "date-time",
                  example: "2025-07-15T08:45:00Z",
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "An error occurred." },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation successful.",
            },
          },
        },

        MenuItem: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64e0fe4f5311236168b222cd" },
            name: { type: "string", example: "Veg Burger" },
            description: {
              type: "string",
              example: "Delicious burger with fresh vegetables",
            },
            price: { type: "number", format: "float", example: 129.99 },
            image: { type: "string", example: "https://example.com/image.jpg" },
            category: { type: "string", example: "Burgers" },
            available: { type: "boolean", example: true },
          },
        },
        OrderItem: {
          type: "object",
          properties: {
            menuItemId: { type: "string", example: "64e0fe4f5311236168b222cd" },
            quantity: { type: "integer", example: 2 },
          },
        },
        Restaurant: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64e0fe4f5311236168b222cd" },
            user: { type: "string", example: "60d0fe4f5311236168a109ca" },
            restaurantName: { type: "string", example: "Paaji Da Dhaba" },
            city: { type: "string", example: "Amritsar" },
            country: { type: "string", example: "India" },
            deliveryTime: { type: "number", example: 30 },
            cuisines: {
              type: "array",
              items: { type: "string" },
              example: ["North Indian", "Punjabi"],
            },
            imageUrl: {
              type: "string",
              example: "https://example.com/banner.jpg",
            },
            menus: {
              type: "array",
              items: { type: "string" },
              example: ["664e87e153b0f772e8820858", "664e8b9a53b0f772e8820863"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-01T12:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-01T13:00:00Z",
            },
          },
        },
        RestaurantResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: {
              type: "string",
              example: "Restaurant created successfully!",
            },
            Restaurant: { $ref: "#/components/schemas/Restaurant" },
          },
        },
        OrdersListResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            orders: {
              type: "array",
              items: { $ref: "#/components/schemas/Order" },
            },
          },
        },
        CartItem: {
          type: "object",
          properties: {
            menuId: { type: "string", example: "664e87e153b0f772e8820858" },
            name: { type: "string", example: "Veg Burger" },
            image: { type: "string", example: "https://example.com/menu.jpg" },
            price: { type: "number", example: 99.99 },
            quantity: { type: "number", example: 2 },
          },
        },
        DeliveryDetails: {
          type: "object",
          properties: {
            email: { type: "string", example: "customer@email.com" },
            name: { type: "string", example: "John Smith" },
            address: { type: "string", example: "123 Main Street" },
            city: { type: "string", example: "Delhi" },
            country: { type: "string", example: "India" },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string", example: "663a7b5271532224e8c3da57" },
            user: { type: "string", example: "60d0fe4f5311236168a109ca" },
            restaurant: { type: "string", example: "64e0fe4f5311236168b222cd" },
            deliveryDetails: { $ref: "#/components/schemas/DeliveryDetails" },
            cartItems: {
              type: "array",
              items: { $ref: "#/components/schemas/CartItem" },
            },
            totalAmount: { type: "number", example: 399.99 },
            status: {
              type: "string",
              enum: [
                "pending",
                "confirmed",
                "preparing",
                "outfordelivery",
                "delivered",
              ],
              example: "pending",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-01T12:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-01T12:35:00Z",
            },
          },
        },
        Menu: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64e0fe4f5311236168b222cd" },
            name: { type: "string", example: "Paneer Butter Masala" },
            description: {
              type: "string",
              example: "A delicious paneer curry in a buttery tomato sauce.",
            },
            price: { type: "number", example: 250 },
            imageUrl: {
              type: "string",
              example: "https://example.com/menu-image.jpg",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-01T12:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-01T13:00:00Z",
            },
          },
        },
        MenuSchema: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64e0fe4f5311236168b222cd" },
            name: { type: "string", example: "Paneer Butter Masala" },
            description: {
              type: "string",
              example: "A delicious paneer curry in a buttery tomato sauce.",
            },
            price: { type: "number", example: 250 },
            imageUrl: {
              type: "string",
              example: "https://example.com/menu-image.jpg",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-01T12:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-01T13:00:00Z",
            },
          },
          required: ["name", "description", "price", "imageUrl"],
        },

      },
    },
  },
  apis: ["./Server/routes/*.ts", ],
};

const swaggerSpec = swaggerJsdoc(options);
const router = Router();
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default router;
