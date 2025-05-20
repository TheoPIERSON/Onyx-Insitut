export interface TimeSlot {
  id: number;
  date: string; // format 'YYYY-MM-DD'
  hour: string | null; // '14:00' ou null si journée entière bloquée
}
