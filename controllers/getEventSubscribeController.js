import UserEvent from "../models/UserEvent.js";
import User from "../models/User.js";
import sequelize from "../db.js";

const getEventSubscribers = async (req, res) => {
  const { eventId } = req.params;

  try {
    await sequelize.sync();

    const subscribers = await UserEvent.findAll({
      where: { eventId:eventId },
      include: {
        model: User,
        attributes: ['completeName'],
      },
    });

    const subscriberNames = subscribers.map(subscriber => subscriber.User.completeName);

    res.status(200).json(subscriberNames);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default getEventSubscribers;