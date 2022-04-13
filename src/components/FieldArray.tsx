import { useForm, useFieldArray } from 'react-hook-form';

type Track = {
  title: string;
};

type FormValues = {
  album: Track[];
};

export default function FieldArray() {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      album: [{ title: '' }],
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'album',
    control,
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            placeholder="name"
            {...register(`album.${index}.title` as const, {
              required: true,
            })}
          />

          <button type="button" onClick={() => remove(index)}>
            DELETE
          </button>
        </div>
      ))}

      <div>
        <button
          type="button"
          onClick={() =>
            append({
              title: '',
            })
          }
        >
          ADD
        </button>

        <input type="submit" />
      </div>
    </form>
  );
}
