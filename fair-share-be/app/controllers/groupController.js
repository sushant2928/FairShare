const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createGroup = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.userId; // Assuming the user ID is in `req.user` from authentication middleware

  try {
    const group = await prisma.group.create({
      data: {
        name,
        description,
        members: {
          create: {
            userId,
            balance: 0,
          },
        },
      },
    });

    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: "Error creating group" });
  }
};

exports.getGroups = async (req, res) => {
  const userId = req.user.userId; // Assuming the user ID is in `req.user`

  try {
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: true,
        expenses: true,
      },
    });

    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: "Error fetching groups" });
  }
};

exports.addUserToGroup = async (req, res) => {
  const { groupId, userId } = req.body;

  try {
    // Check if the group exists
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the user is already in the group
    const existingGroupUser = await prisma.groupUser.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });

    if (existingGroupUser) {
      return res.status(400).json({ message: "User is already in the group" });
    }

    // Add the user to the group
    const groupUser = await prisma.groupUser.create({
      data: {
        userId,
        groupId,
        balance: 0, // Default balance
      },
    });

    res.status(201).json({ message: "User added to the group", groupUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding user to the group", error: err.message });
  }
};
