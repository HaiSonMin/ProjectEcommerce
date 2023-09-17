const schedule = require("node-schedule");
const { SessionAuthModel } = require("../models");

schedule.scheduleJob("*/10 * * * *", async () => {
  const currentTime = Date.now();
  try {
    // Find and delete data where session_duration is less than the current time
    const result = await SessionAuthModel.deleteMany({
      session_duration: { $lt: currentTime },
    });
    console.log(`Deleted ${result.deletedCount} expired records.`);
  } catch (err) {
    console.error("Error deleting expired records:", err);
  }
});
