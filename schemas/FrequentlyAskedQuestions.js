fetch(
  '/api/dataentities/FrequentlyAskedQuestions/schemas/FrequentlyAskedQuestions',
  {
    method: 'PUT',
    headers: {
      'content-type': 'application/json', // Indicates the content
    },
    body: JSON.stringify({
      title: 'FAQ',
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          maxLength: 100,
          title: 'Seleziona argomento',
          enum: ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'],
        },
        question: {
          type: 'string',
          maxLength: 500,
          title: 'description',
        },
      },
      required: ['topic', 'question'],
      'v-security': {
        publicWrite: ['topic', 'question'],
        publicJsonSchema: true,
      },
      'v-triggers': [
        {
          name: 'insert-question',
          active: true,
          condition: '',
          action: {
            type: 'save',
            dataEntity: 'FQ',
            json: {
              topic: '{!topic}',
              question: '{!question}',
            },
          },
        },
      ],
    }),
  }
).then((res) => res.json())
