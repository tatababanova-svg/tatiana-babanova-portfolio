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

  if (index === 1) {
    return (
      <div className="result-signal result-signal-flow" role="img" aria-label="Пять подразделений прошли миграцию без остановок и потерь">
        <span className="signal-source" />
        <i /><i /><i /><i /><i />
        <span className="signal-target">0</span>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="result-signal result-signal-deadline" role="img" aria-label="Требования изменились, но фиксированная дата запуска была сохранена">
        <span>Изменение</span><i /><i /><i /><b>Запуск</b>
      </div>
    );
  }

  return (
    <div className="result-signal result-signal-network" role="img" aria-label="До семнадцати участников объединены в один проектный контур">
      <strong>17</strong>
      {Array.from({ length: 8 }, (_, itemIndex) => <i key={itemIndex} />)}
    </div>
  );
}

export function CaseSignal({ index }: { index: number }) {
  const names = ["Снижение затрат", "Безопасная миграция", "Фиксированный срок", "Параллельные запуски"];
  return (
    <div className={`case-signal case-signal-${index + 1}`} role="img" aria-label={names[index]}>
      <span className="case-signal-line" />
      <i /><i /><i /><i />
      <b>{index === 0 ? "−78%" : index === 1 ? "0 потерь" : index === 2 ? "В срок" : "3 / 90"}</b>
    </div>
  );
}
