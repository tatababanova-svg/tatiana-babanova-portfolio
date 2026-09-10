export function ProjectRouteWidget() {
  return (
    <div className="project-route-widget" role="img" aria-label="Маршрут проекта: цель, решение, план, запуск и результат">
      <svg viewBox="0 0 760 154" preserveAspectRatio="none" aria-hidden="true">
        <path className="project-route-base" d="M14 78 C112 12 168 142 270 78 S430 17 516 78 S647 137 746 78" />
        <path className="project-route-active" d="M14 78 C112 12 168 142 270 78 S430 17 516 78 S647 137 746 78" />
        {[14, 194, 378, 562, 746].map((x) => <circle key={x} cx={x} cy="78" r="7" />)}
        <circle className="project-route-runner" cx="14" cy="78" r="9" />
      </svg>
      <div className="project-route-labels" aria-hidden="true">
        <span>Цель</span><span>Решение</span><span>План</span><span>Запуск</span><span>Результат</span>
      </div>
    </div>
  );
}

export function ResultSignal({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="result-signal result-signal-cost" role="img" aria-label="Затраты сократились с 300 до 65 тысяч рублей в месяц">
        <div><span>300</span><i /></div>
        <div><span>65</span><i /></div>
      </div>
    );
  }

  if (index === 1 || index === 2) return null;

  return (
    <div className="result-signal result-signal-network" role="img" aria-label="До семнадцати участников объединены в один проектный контур">
      <strong>17</strong>
      {Array.from({ length: 8 }, (_, itemIndex) => <i key={itemIndex} />)}
    </div>
  );
}

export function CaseSignal({ index }: { index: number }) {
  const names = ["Снижение затрат", "Безопасная миграция", "Фиксированный срок", "Параллельные запуски"];
  const metrics = ["−78%", "0 потерь", "В срок", "3 / 90"];
  return (
    <div className={`case-signal case-signal-${index + 1}`} role="img" aria-label={names[index]}>
      <svg viewBox="0 0 320 260" aria-hidden="true">
        <circle className="case-signal-orbit case-signal-orbit-outer" cx="160" cy="130" r="104" />
        <circle className="case-signal-orbit case-signal-orbit-inner" cx="160" cy="130" r="66" />
        <path className="case-signal-route" d="M45 166 C92 51 189 218 275 92" />
        <circle className="case-signal-node case-signal-node-1" cx="45" cy="166" r="7" />
        <circle className="case-signal-node case-signal-node-2" cx="160" cy="130" r="7" />
        <circle className="case-signal-node case-signal-node-3" cx="275" cy="92" r="7" />
        <circle className="case-signal-runner" cx="45" cy="166" r="10" />
      </svg>
      <span>{names[index]}</span>
      <b>{metrics[index]}</b>
    </div>
  );
}
