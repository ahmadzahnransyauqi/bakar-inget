const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    // PERUBAHAN 1: Priority
    priority: {
      type: DataTypes.STRING, // Ubah ke STRING agar cocok dengan SQL VARCHAR
      defaultValue: "medium",
      validate: {
        isIn: [["low", "medium", "high"]], // Validasi pilihan tetap berjalan di sini
      },
    },
    // PERUBAHAN 2: Status
    status: {
      type: DataTypes.STRING, // Ubah ke STRING
      defaultValue: "todo",
      validate: {
        isIn: [["todo", "in-progress", "done"]],
      },
    },
    // PERUBAHAN 3: Reminder
    reminder: {
      type: DataTypes.STRING, // Ubah ke STRING
      defaultValue: "none",
      validate: {
        isIn: [["none", "1-hour", "1-day", "same-day"]],
      },
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Task;