import db from "../models/index.js";
import schedule from "node-schedule";

export const renewMembership = async (req, res, next) => {
  try {
    const { member_id, plan_id } = req.body;

    const plan = await db.MembershipPlan.findByPk(plan_id);
    if (!plan) {
      return res.status(404).json({
        message: "Membership plan not found",
      });
    }

    const member = await db.Member.findByPk(member_id);
    if (!member) {
      return res.status(404).json({
        message: "Member not Found!",
      });
    }

    // Calculation of Expire date
    const currentDate = new Date();
    const existingExpiryDate = member.membership_expiry_date;

    const newExpiryDate =
      member.membership_expiry_date > currentDate
        ? new Date(
            member.membership_expiry_date.getTime() +
              plan.duration_in_days * 24 * 60 * 60 * 1000 // Corrected field name
          )
        : new Date(
            currentDate.getTime() + plan.duration_in_days * 24 * 60 * 60 * 1000 // Corrected field name
          );

    member.membership_plan_id = plan.plan_id;
    member.membership_expiry_date = newExpiryDate;
    await member.save();

    res.json({
      message: "membership renewed successfully",
      membership_expiry_date: member.membership_expiry_date,
    });
  } catch (err) {
    next(err);
  }
};

export const notifyExpiringMemberships = async () => {
  const today = new Date();
  const reminderDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000); // 3day to be expired

  const expiringMembers = await db.member.findAll({
    where: {
      membership_expiry_date: {
        // db.Sequelize.Op is a reference to Sequelize's built-in operators.
        // lte stands for "less than or equal to"
        [db.Sequelize.Op.lte]: reminderDate,
      },
    },
  });

  expiringMembers.forEach((member) => {
    // sendNotification()
    console.log(
      "Membership Expiry Reminder",
      `Hi ${member.name}, your membership expires soon!`
    );
  });
};

schedule.scheduleJob("0 0 * * *", notifyExpiringMemberships);

export const getMembershipDeatials = async (req, res, next) => {
  try {
    const member = await db.Member.findByPk(req.param.member_id, {
      include: db.MembershipPlan,
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.json({
      member_id: member.member_id,
      name: member.name,
      membership_plan_id: member.MembershipPlan.name,
      membership_expiry_date: member.membership_expiry_date,
    });
  } catch (err) {
    next(err);
  }
};
