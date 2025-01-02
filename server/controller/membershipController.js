import db from "../models/index.js";

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
