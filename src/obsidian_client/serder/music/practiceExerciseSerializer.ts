import { SerializerBuilder, link } from 'src/common/mdast_serializer';
import { PracticeExercise } from 'src/systems/music/resource_access/practice_exercise';

export const practiceExerciseSerializer = new SerializerBuilder<PracticeExercise>()
        .frontMatter({
            get: (exercise) => ({
                instrument: exercise.instrument,
                source: exercise.source,
            }),
            set: (metadata) => ({ 
                instrument: metadata.instrument,
                source: metadata.source,
            }),
        })
        .heading2("description")
        .paragraph({
            get: (exercise) => exercise.description,
            set: (value) => ({description: value}),
        });
