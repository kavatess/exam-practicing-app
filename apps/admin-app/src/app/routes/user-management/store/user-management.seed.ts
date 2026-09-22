import {
    AdminUser,
    UserActivity,
    UserRole,
    UserStat,
    UserStatus,
} from '../../../shared/models/cms.model';

/** Learners the bank reports, beyond the page this demo loads. */
export const SEEDED_USER_TOTAL = 12480;

/** `[name, email, role, status, joined]` */
const USER_SEEDS: [string, string, UserRole, UserStatus, string][] = [
    ['Nguyễn Minh Anh', 'minhanh@example.com', 'User', 'Active', '12 Mar 2026'],
    ['Trần Quốc Bảo', 'qbao@example.com', 'User', 'Active', '12 Mar 2026'],
    ['Lê Thu Hà', 'thuha@example.com', 'Admin', 'Active', '11 Mar 2026'],
    ['Phạm Gia Huy', 'giahuy@example.com', 'User', 'Inactive', '11 Mar 2026'],
    ['Đỗ Khánh Linh', 'klinh@example.com', 'User', 'Active', '10 Mar 2026'],
    ['Vũ Tuấn Kiệt', 'tkiet@example.com', 'User', 'Active', '09 Mar 2026'],
    ['Hoàng Bảo Châu', 'bchau@example.com', 'Admin', 'Inactive', '08 Mar 2026'],
    ['Dương Nhật Nam', 'nnam@example.com', 'User', 'Active', '08 Mar 2026'],
    ['Bùi Thanh Thảo', 'tthao@example.com', 'User', 'Active', '07 Mar 2026'],
];

export function seedUsers(): AdminUser[] {
    return USER_SEEDS.map(([name, email, role, status, joined], index) => ({
        id: `u_${10482 + index}`,
        name,
        email,
        role,
        status,
        joined,
    }));
}

/** The drawer's figures and feed, the same for every learner in the demo. */
export const SEEDED_USER_STATS: UserStat[] = [
    { label: 'TOTAL XP', value: '1,240' },
    { label: 'DAY STREAK', value: '6' },
    { label: 'TESTS DONE', value: '31' },
    { label: 'GEMS', value: '195' },
];

export const SEEDED_USER_ACTIVITY: UserActivity[] = [
    { text: 'Completed "Đạo hàm" unit test · 8/10', when: '2 hours ago' },
    { text: 'Purchased Energy Refill · 350 gems', when: 'Yesterday, 21:04' },
    { text: 'Earned achievement "Wildfire"', when: '14 Mar 2026' },
    { text: 'Signed in from a new device', when: '13 Mar 2026' },
];
