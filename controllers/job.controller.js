import Job from "../models/job.model.js";
import Application from "../models/application.model.js";

// Create a new job
export const createJob = async (req, res, next) => {
    try {
        const recruiterId = req.user.id;

        const { title, description, requiredSkills, experienceLevel, location, jobType, department, minimumQualifications, preferredQualifications, salary } = req.body;

        if (!title || !description || !experienceLevel || !location) {
          return res.status(400).json({
            success: false,
            message: "Missing required fields",
          });
        }

        const job = await Job.create({
          title,
          description,
          requiredSkills,
          experienceLevel,
          location,
          jobType,
          department,
          minimumQualifications,
          preferredQualifications,
          salary,
          company: req.user.business,
          recruiter: recruiterId,
        });

        res.status(201).json({
          success: true,
          message: "Job created successfully",
          data: job,
        });
    } catch (error) {
        next(error);
    }
};

// Editing (updating) an already existing job
export const updateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!job) {
            return res.status(404).json({
              success: false,
              message: "Job not found"
            });
        }

        res.json({
          success: true,
          message: "Job updated",
          data: job
        });

    } catch (error) {
        next(error);
    }
};

// Deactivating a job
export const deactivateJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(
          req.params.id,
          { status: "inactive" },
          { new: true },
        );

        res.json({
          success: true,
          message: "Job deactivated",
          data: job,
        });

    } catch (error) {
        next(error);
    }
};

// Finding all the jobs a recruiter has posted
export const getRecruiterJobs = async (req, res, next) => {
    try {
        const recruiterId = req.user.id;

        const jobs = await Job.find({
          recruiter: recruiterId
        }).sort({ createdAt: -1 });

        // Add applicants count to each job
        const jobsWithCount = await Promise.all(
            jobs.map(async (job) => {
                const applicantsCount = await Application.countDocuments({ job: job._id });
                return {
                    ...job.toObject(),
                    applicantsCount,
                };
            })
        );

        res.json({
          success: true,
          data: jobsWithCount
        });

    } catch (error) {
        next(error);
    }
};

// Get all active jobs (public - for candidates to browse)
export const getAllJobs = async (req, res, next) => {
    try {
        const { search, jobType, location, sort } = req.query;

        let query = { status: "active" };

        // Search by title, skill or location
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { requiredSkills: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
            ];
        }

        // Filter by job type
        if (jobType) {
            query.jobType = jobType;
        }

        // Filter by location
        if (location) {
            query.location = { $regex: location, $options: "i" };
        }

        // Sort by newest or popular
        let sortOption = { createdAt: -1 };
        if (sort === "popular") {
            sortOption = { views: -1 };
        }

        const jobs = await Job.find(query).sort(sortOption);

        // Add applicants count to each job
        const jobsWithCount = await Promise.all(
            jobs.map(async (job) => {
                const applicantsCount = await Application.countDocuments({ job: job._id });
                return {
                    ...job.toObject(),
                    applicantsCount,
                };
            })
        );

        res.json({
            success: true,
            count: jobs.length,
            data: jobsWithCount,
        });

    } catch (error) {
        next(error);
    }
};

// Get a single job by ID (increments view count)
export const getJobById = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Get applicants count for this job
        const applicantsCount = await Application.countDocuments({ job: job._id });

        res.json({
            success: true,
            data: {
                ...job.toObject(),
                applicantsCount,
            },
        });

    } catch (error) {
        next(error);
    }
};