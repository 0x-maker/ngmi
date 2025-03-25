export function ProfessionalTemplate({ data }) {
  const { personal, experience, education, skills, projects } = data

  return (
    <div className="flex flex-col bg-white p-8 text-sm">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{personal.name || "Your Name"}</h1>
        <div className="mt-2 flex flex-wrap gap-x-4 text-sm text-gray-600">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.address && <div>{personal.address}</div>}
          {personal.website && <div>{personal.website}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">Professional Summary</h2>
          <div className="h-1 w-16 bg-gray-300"></div>
          <p className="mt-3">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">Experience</h2>
          <div className="h-1 w-16 bg-gray-300"></div>
          <div className="mt-3 space-y-5">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-semibold text-gray-800">{job.position}</h3>
                  <span className="text-sm font-medium text-gray-600">
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between">
                  <span className="font-medium">{job.company}</span>
                  <span className="text-sm text-gray-600">{job.location}</span>
                </div>
                <p className="mt-2 whitespace-pre-line text-sm">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">Education</h2>
          <div className="h-1 w-16 bg-gray-300"></div>
          <div className="mt-3 space-y-5">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-semibold text-gray-800">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <span className="text-sm font-medium text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between">
                  <span className="font-medium">{edu.institution}</span>
                  <span className="text-sm text-gray-600">{edu.location}</span>
                </div>
                {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">Projects</h2>
          <div className="h-1 w-16 bg-gray-300"></div>
          <div className="mt-3 space-y-5">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-semibold text-gray-800">
                    {project.name} {project.role && `- ${project.role}`}
                  </h3>
                  <span className="text-sm font-medium text-gray-600">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                {project.url && <div className="text-sm text-blue-600">{project.url}</div>}
                <p className="mt-2 whitespace-pre-line text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h2 className="mb-2 text-lg font-semibold text-gray-800">Skills</h2>
          <div className="h-1 w-16 bg-gray-300"></div>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="rounded bg-gray-100 px-3 py-1 text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

