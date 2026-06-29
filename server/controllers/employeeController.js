import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";

//Get employees
//GET /api/employees
export const getEmployees = async (req, res) => {
    try {
        const { department } = req.query;
        const where = {};
        if (department) where.department = department;

        const employees = await Employee.find(where)
            .sort({ createdAt: -1 })
            .populate("userId", "email role")
            .lean();

        const result = employees.map((emp) => ({
            ...emp,
            id: emp._id.toString(),
            user: emp.userId ? { email: emp.userId.email, role: emp.userId.role } : null
        }))
        return res.json(result)

    } catch (error) {
        // Error handling logic would go here
        return res.status(500).json({ error: "failed to fetch employees" })
    }

}

//Create Employee
//POST /api/employees
export const createEmployee = async (req, res) => {
    try {
        const {
            userId,
            firstName,
            lastName,
            email,
            password,
            phone,
            position,
            basicSalary,
            allowances,
            deductions,
            joinDate,
            bio,
            department,
            role
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !phone ||
            !position ||
            !joinDate ||
            !department
        ) {
            return res.status(400).json({
                error: "All required fields must be provided"
            });
        }
        // Check if employee already exists for this user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: "Email already exists"
            });
        }

        const hashed = await bcrypt.hash(password, 10)

        const user = await User.create({
            email,
            password: hashed,
            role: role || "EMPLOYEE"
        })



        const employee = await Employee.create({
            userId: user._id,
            firstName,
            lastName,
            email,
            phone,
            position,
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            joinDate: new Date(joinDate),
            bio: bio || "",
            department: department || "Engineering"
        });

        const populatedEmployee = await Employee.findById(employee._id)
            .populate("userId", "email role")
            .lean();

        const result = {
            ...populatedEmployee,
            id: populatedEmployee._id.toString(),
            user: populatedEmployee.userId
                ? {
                    email: populatedEmployee.userId.email,
                    role: populatedEmployee.userId.role
                }
                : null
        };

        return res.status(201).json(result);

    } catch (error) {
    console.error(error);

    if (error.code === 11000) {
        return res.status(400).json({
            error: "Employee or email already exists"
        });
    }

    return res.status(500).json({
        error: "Failed to create employee"
    });
}
}

//update Employee
// PUT /api/employees/:id
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    const {
      firstName,
      lastName,
      email,
      password,
      role,
      phone,
      position,
      basicSalary,
      allowances,
      deductions,
      joinDate,
      bio,
      department,
      employmentStatus,
    } = req.body;

    // Update Employee
    employee.firstName = firstName ?? employee.firstName;
    employee.lastName = lastName ?? employee.lastName;
    employee.email = email ?? employee.email;
    employee.phone = phone ?? employee.phone;
    employee.position = position ?? employee.position;
    employee.basicSalary = basicSalary ?? employee.basicSalary;
    employee.allowances = allowances ?? employee.allowances;
    employee.deductions = deductions ?? employee.deductions;
    employee.joinDate = joinDate ?? employee.joinDate;
    employee.bio = bio ?? employee.bio;
    employee.department = department ?? employee.department;
    employee.employmentStatus =
      employmentStatus ?? employee.employmentStatus;

    await employee.save();

    // Update User
    if (employee.userId) {
      const user = await User.findById(employee.userId);

      if (user) {
        if (email) user.email = email;
        if (role) user.role = role;

        if (password) {
          user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
      }
    }

    const updatedEmployee = await Employee.findById(id)
      .populate("userId", "email role")
      .lean();

    return res.json({
      ...updatedEmployee,
      id: updatedEmployee._id.toString(),
      user: updatedEmployee.userId
        ? {
            email: updatedEmployee.userId.email,
            role: updatedEmployee.userId.role,
          }
        : null,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    return res.status(500).json({
      error: "Failed to update employee",
    });
  }
};

//delete Employee
// DELETE /api/employees/:id
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({
                error: "Employee not found"
            });
        }

        employee.isDeleted = true;
        employee.employmentStatus = "INACTIVE";

        await employee.save();

        return res.json({
            message: "Employee deleted successfully"
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to delete employee"
        });
    }
}
;