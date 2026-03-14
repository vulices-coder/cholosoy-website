"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./EventFilters.module.scss";

export default function EventFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") ?? "ALL";
  const currentSort = searchParams.get("sort") ?? "date-asc";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.filters}>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="status">
          Status
        </label>
        <select
          id="status"
          value={currentStatus}
          onChange={(e) => updateParam("status", e.target.value)}
          className={styles.select}
        >
          <option value="ALL">Alle</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="CANCELED">Canceled</option>
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="sort">
          Sortierung
        </label>
        <select
          id="sort"
          value={currentSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className={styles.select}
        >
          <option value="date-asc">Datum ↑</option>
          <option value="date-desc">Datum ↓</option>
          <option value="created-desc">Neueste zuerst</option>
        </select>
      </div>
    </div>
  );
}