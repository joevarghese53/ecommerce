export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'array',
        of: [{ type: 'image' }],
        options: {
          hotspot: true,
        }
      },
      { 
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      { 
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 90,
        }
      },
      { 
        name: 'price',
        title: 'Price',
        type: 'number', 
      },
      { 
        name: 'details',
        title: 'Details',
        type: 'string',
      },
      { 
        name: 'category',
        title: 'Category',
        type: 'string',
      },
      { 
        name: 'offers',
        title: 'Offers',
        type: 'string',
      },
      { 
        name: 'returnpolicy',
        title: 'Returnpolicy',
        type: 'string',
      },
      {
        name: 'reviews',
        title: 'Reviews',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'name',
                title: 'Name',
                type: 'string',
              },
              {
                name: 'rating',
                title: 'Rating',
                type: 'number',
                options: {
                  list: [1, 2, 3, 4, 5],
                  layout: 'radio',
                },
              },
              {
                name: 'comment',
                title: 'Comment',
                type: 'text',
              },
            ],
          },
        ],
      },
    ]
  }