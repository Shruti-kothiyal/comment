// const usercommentlikedislike = require("../models/usercommentlikedislike");

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.sequelize.transaction((t) => {
//       return Promise.all([
//         queryInterface.changeColumn(
//           "userCommentLikeDislike",
//           "userId",
//           {
//             references: {
//               model: "user",
//               key: "id",
//             },
//           },
//           { transaction: t }
//         ),
//         queryInterface.changeColumn(
//           "userCommentLikeDislike",
//           "commentId",
//           {
//             references: {
//               model: "userComment",
//               key: "id",
//             },
//           },
//           { transaction: t }
//         ),
//         queryInterface.changeColumn(
//           "userCommentLikeDislike",
//           "consumerId",
//           {
//             references: {
//               model: "consumer",
//               key: "id",
//             },
//           },
//           { transaction: t }
//         ),
//         queryInterface.changeColumn(
//           "userCommentLikeDislike",
//           "consumerSubChapId",
//           {
//             references: {
//               model: "consumerSubChap",
//               key: "id",
//             },
//           },
//           { transaction: t }
//         ),
//       ]);
//     });
//   },

//   down: (queryInterface, Sequelize) => {
//     return queryInterface
//       .removeColumn
//       //'userId', // name of Source model
//       //'CustomerId' // key we want to remove
//       ();
//   },
// };

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          "userCommentLikeDislike",
          "userId",
          {
            references: {
              model: "user",
              key: "id",
            },
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "userCommentLikeDislike",
          "commentId",
          {
            references: {
              model: "userComment",
              key: "id",
            },
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "userCommentLikeDislike",
          "consumerId",
          {
            references: {
              model: "consumer",
              key: "id",
            },
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          "userCommentLikeDislike",
          "consumerSubChapId",
          {
            references: {
              model: "consumerSubChap",
              key: "id",
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface
    //   .removeColumn
    //   //'userId', // name of Source model
    //   //'CustomerId' // key we want to remove
    //   ();
  },
};
