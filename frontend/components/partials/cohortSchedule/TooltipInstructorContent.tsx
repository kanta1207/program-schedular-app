import { CONTRACT_TYPES } from '@/constants/_index';
import { GetInstructorsResponse } from '@/types/instructor';

interface TooltipInstructorContentProps {
  instructor: GetInstructorsResponse;
}

const TooltipInstructorContent: React.FC<TooltipInstructorContentProps> = ({ instructor }) => {
  const weekdaysRange = instructor.periodOfDays.map(({ name }) => name).join(', ');
  const masterFullTime = CONTRACT_TYPES.find(({ name }) => name === 'Full time');
  const masterPartTime = CONTRACT_TYPES.find(({ name }) => name === 'Part time');
  const contractInfo =
    instructor.contractType.name === 'Contract'
      ? `(${instructor.desiredWorkingHours} hours desired)`
      : `(Max: ${
          instructor.contractType.name === 'Full time' ? masterFullTime?.maxHours : masterPartTime?.maxHours
        } hours, Min: ${
          instructor.contractType.name === 'Full time' ? masterFullTime?.minHours : masterPartTime?.minHours
        } hours)`;

  return (
    <div>
      {/* Availability */}
      <p>
        Availability: {instructor.weekdaysRange.name} ({weekdaysRange})
      </p>
      {/* Contract Type */}
      <p>
        Contract: {instructor.contractType.name} {contractInfo}{' '}
      </p>
      {/* Courses */}
      <p>Courses:</p>
      <ul>
        {instructor.courses.map((course) => (
          <li key={course.id}>&bull; {course.name}</li>
        ))}
      </ul>
      {/* Note */}
      {instructor.note && (
        <div>
          <br />
          <p>Note:</p>
          <p>{instructor.note}</p>
        </div>
      )}
    </div>
  );
};

export default TooltipInstructorContent;
