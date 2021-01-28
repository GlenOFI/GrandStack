export const resolvers = {
  Query: {
    allBusinesses: (obj, args, context, info) => {
      return context.db.businesses;
    },
    businessBySearchTerm: (obj, args, context, info) => {
      // TODO: search businesses for matching search term
    },
  },
  Business: {
    reviews: (obj, args, context, info) => {
      // TODO: find reviews for a particular business
    },
    avgStars: (obj, args, context, info) => {
      // TODO: calculate average stars aggregation
    },
  },
  Review: {
    user: (obj, args, context, info) => {
      // TODO: find the user who wrote this review
    },
    business: (obj, args, context, info) => {
      // TODO: find the business for this  review
    },
  },
  User: {
    reviews: (obj, args, context, info) => {
      // TODO: find all reviews written by a user
    },
  },
};
