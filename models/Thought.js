const { Schema, model } = require('mongoose');
const Response = require('./Response');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    responses: [Response],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
// Create a virtual property `responses` that gets the amount of response per video
thoughtSchema
  .virtual('getResponses')
  // Getter
  .get(function () {
    return this.responses.length;
  });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
