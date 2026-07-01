import Employee from "../models/Employee.js";

// Get profile
// GET /api/profile
export const getProfile = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({ userId: session.userId });

        if (!employee) {
            return res.json({
                firstName: "Admin",
                lastName: "",
                email: session.email,
                role: session.role,
            });
        }

        return res.json({
            ...employee.toObject(),
            role: session.role,
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch profile" });
    }
};

// Update profile
// POST /api/profile
export const updateProfile = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({ userId: session.userId });

        if (!session?.role || session.role !== "ADMIN") {
            return res.status(403).json({ error: "Only admins can update profile details" });
        }

        if (!employee) {
            return res.status(404).json({ error: "Employee profile not found" });
        }

        if (employee.isDeleted) {
            return res.status(403).json({ error: "Your account is deactivated. You cannot update your profile." });
        }

        const updateData = {};

        if (req.body.firstName !== undefined) updateData.firstName = req.body.firstName;
        if (req.body.lastName !== undefined) updateData.lastName = req.body.lastName;
        if (req.body.email !== undefined) updateData.email = req.body.email;
        if (req.body.bio !== undefined) updateData.bio = req.body.bio;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: "No profile fields were provided" });
        }

        await Employee.findByIdAndUpdate(employee._id, updateData);

        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: "Failed to update profile" });
    }
};