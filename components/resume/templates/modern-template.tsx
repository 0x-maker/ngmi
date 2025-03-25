export function ModernTemplate({ data }) {
  const { personal, experience, education, skills, projects } = data

  return (
    <div className="flex flex-col bg-white p-8 text-black text-sm">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-black">{personal.name || "Your Name"}</h1>
        <div className="mt-2 flex flex-wrap justify-center gap-x-3 text-sm text-gray-600">
          {personal.email && <div className="text-gray-600">{personal.email}</div>}
          {personal.phone && <div className="text-gray-600">{personal.phone}</div>}
          {personal.address && <div className="text-gray-600">{personal.address}</div>}
          {personal.website && <div className="text-gray-600">{personal.website}</div>}
          {personal.linkedin && <div className="text-gray-600">{personal.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-6">
          <h2 className="mb-2 border-b border-gray-300 pb-1 text-lg font-semibold text-black">Professional Summary</h2>
          <p className="text-black">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 border-b border-gray-300 pb-1 text-lg font-semibold text-black">Work Experience</h2>
          <div className="space-y-4">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-medium text-black">{job.position}</h3>
                  <span className="text-sm text-gray-600">
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between">
                  <span className="text-black">{job.company}</span>
                  <span className="text-sm text-gray-600">{job.location}</span>
                </div>
                <p className="mt-1 whitespace-pre-line text-sm text-black">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 border-b border-gray-300 pb-1 text-lg font-semibold text-black">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-medium text-black">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between">
                  <span className="text-black">{edu.institution}</span>
                  <span className="text-sm text-gray-600">{edu.location}</span>
                </div>
                {edu.description && <p className="mt-1 text-sm text-black">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 border-b border-gray-300 pb-1 text-lg font-semibold text-black">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-medium text-black">
                    {project.name} {project.role && `- ${project.role}`}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                {project.url && <div className="text-sm text-blue-600">{project.url}</div>}
                <p className="mt-1 whitespace-pre-line text-sm text-black">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h2 className="mb-2 border-b border-gray-300 pb-1 text-lg font-semibold text-black">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
              <span key={index} className="rounded-md bg-gray-100 px-2 py-1 text-sm text-black">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

