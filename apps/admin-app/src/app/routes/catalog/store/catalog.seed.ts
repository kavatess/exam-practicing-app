import {
    AdminEntity,
    EntityField,
    EntityKind,
    EntityTone,
} from '../../../shared/models/cms.model';

/** `[name, description, condition/price, state, tone, fields]` */
type EntitySeed = [
    string,
    string,
    string,
    string,
    EntityTone,
    EntityField[]
];

function field(label: string, value: string, hint = ''): EntityField {
    return { label, value, hint };
}

const ACHIEVEMENTS: EntitySeed[] = [
    ['Wildfire', 'Reach a 7 day streak', 'STREAK · 7', '3 levels', 'ok', [
        field('Condition type', 'DayStreak', '▾'),
        field('Condition value', '7'),
        field('Reward', 'Gems', '▾'),
        field('Reward amount', '50'),
    ]],
    ['Sage', 'Earn 100 XP in a single week', 'XP · 100', '5 levels', 'ok', [
        field('Condition type', 'WeeklyXp', '▾'),
        field('Condition value', '100'),
        field('Reward', 'Gems', '▾'),
        field('Reward amount', '80'),
    ]],
    ['Scholar', 'Learn 50 new terms in a course', 'TERMS · 50', '4 levels', 'ok', [
        field('Condition type', 'TermsLearned', '▾'),
        field('Condition value', '50'),
        field('Reward', 'Gems', '▾'),
        field('Reward amount', '60'),
    ]],
    ['Marksman', 'Answer 100 questions correctly', 'CORRECT · 100', '3 levels', 'ok', [
        field('Condition type', 'CorrectAnswers', '▾'),
        field('Condition value', '100'),
        field('Reward', 'Gems', '▾'),
        field('Reward amount', '70'),
    ]],
    ['Night Owl', 'Practise after 10pm, five times', 'SESSIONS · 5', 'Draft', 'warn', [
        field('Condition type', 'LateSessions', '▾'),
        field('Condition value', '5'),
        field('Reward', 'Gems', '▾'),
        field('Reward amount', '40'),
    ]],
    ['Perfectionist', 'Finish a test with no mistakes', 'TESTS · 1', '3 levels', 'ok', [
        field('Condition type', 'FlawlessTests', '▾'),
        field('Condition value', '1'),
        field('Reward', 'Gems', '▾'),
        field('Reward amount', '90'),
    ]],
    ['Marathoner', 'Complete 20 full tests', 'TESTS · 20', '4 levels', 'ok', [
        field('Condition type', 'TestsCompleted', '▾'),
        field('Condition value', '20'),
        field('Reward', 'Gems', '▾'),
        field('Reward amount', '120'),
    ]],
];

const QUESTS: EntitySeed[] = [
    ['Earn 100 energies', 'Daily · resets at midnight', 'ENERGY · 100', 'Active', 'ok', [
        field('Reward', 'Energy', '▾'),
        field('Reward amount', '100'),
        field('Condition type', 'QuestionsCompleted', '▾'),
        field('Target value', '50'),
    ]],
    ['Complete 2 tests', 'Daily quest', 'TESTS · 2', 'Active', 'ok', [
        field('Reward', 'Gems', '▾'),
        field('Reward amount', '60'),
        field('Condition type', 'TestsCompleted', '▾'),
        field('Target value', '2'),
    ]],
    ['Answer 50 Maths questions', 'Weekly quest', 'QUESTIONS · 50', 'Active', 'ok', [
        field('Reward', 'Gems', '▾'),
        field('Reward amount', '150'),
        field('Condition type', 'QuestionsCompleted', '▾'),
        field('Target value', '50'),
    ]],
    ['3-day streak', 'Weekly quest', 'STREAK · 3', 'Paused', 'warn', [
        field('Reward', 'Gems', '▾'),
        field('Reward amount', '100'),
        field('Condition type', 'DayStreak', '▾'),
        field('Target value', '3'),
    ]],
    ['Perfect unit run', 'Event quest', 'CORRECT · 10', 'Active', 'ok', [
        field('Reward', 'Event Token', '▾'),
        field('Reward amount', '1'),
        field('Condition type', 'CorrectAnswers', '▾'),
        field('Target value', '10'),
    ]],
    ['Invite a friend', 'Evergreen', 'REFERRAL · 1', 'Paused', 'warn', [
        field('Reward', 'Gems', '▾'),
        field('Reward amount', '300'),
        field('Condition type', 'Referrals', '▾'),
        field('Target value', '1'),
    ]],
    ['Review 30 mistakes', 'Weekly quest', 'REVIEW · 30', 'Active', 'ok', [
        field('Reward', 'Energy', '▾'),
        field('Reward amount', '80'),
        field('Condition type', 'MistakesReviewed', '▾'),
        field('Target value', '30'),
    ]],
];

const SHOP_ITEMS: EntitySeed[] = [
    ['Streak Freeze', 'Protects your streak for one day', '200 GEMS', 'Virtual', 'ok', [
        field('Price', '200', 'GEMS'),
        field('Currency', 'Gems', '▾'),
        field('Item type', 'VirtualItem', '▾'),
        field('Quantity', 'Unlimited'),
    ]],
    ['Energy Refill', 'Refills all energies instantly', '350 GEMS', 'Virtual', 'ok', [
        field('Price', '350', 'GEMS'),
        field('Currency', 'Gems', '▾'),
        field('Item type', 'VirtualItem', '▾'),
        field('Quantity', 'Unlimited'),
    ]],
    ['Double XP · 15min', 'Earn double XP for 15 minutes', '120 GEMS', 'Feature', 'info', [
        field('Price', '120', 'GEMS'),
        field('Currency', 'Gems', '▾'),
        field('Item type', 'Feature', '▾'),
        field('Quantity', 'Unlimited'),
    ]],
    ['Hint Pack ×5', 'Five hints for hard questions', '90 GEMS', 'Virtual', 'ok', [
        field('Price', '90', 'GEMS'),
        field('Currency', 'Gems', '▾'),
        field('Item type', 'VirtualItem', '▾'),
        field('Quantity', 'Unlimited'),
    ]],
    ['Exam Pack: THPTQG', 'Unlock 12 full mock exams', '1,200 GEMS', 'Feature', 'info', [
        field('Price', '1200', 'GEMS'),
        field('Currency', 'Gems', '▾'),
        field('Item type', 'Feature', '▾'),
        field('Quantity', 'Unlimited'),
    ]],
    ['Avatar Frame', 'Cosmetic profile frame', '150 GEMS', 'Virtual', 'ok', [
        field('Price', '150', 'GEMS'),
        field('Currency', 'Gems', '▾'),
        field('Item type', 'VirtualItem', '▾'),
        field('Quantity', 'Unlimited'),
    ]],
    ['Sticker Sheet', 'Physical reward, shipped', 'Out of stock', 'Physical', 'warn', [
        field('Price', '400', 'GEMS'),
        field('Currency', 'Gems', '▾'),
        field('Item type', 'PhysicalItem', '▾'),
        field('Quantity', '0'),
    ]],
];

const SEEDS: Record<EntityKind, EntitySeed[]> = {
    achievement: ACHIEVEMENTS,
    quest: QUESTS,
    'shop-item': SHOP_ITEMS,
};

export function seedEntities(kind: EntityKind): AdminEntity[] {
    return SEEDS[kind].map(
        (
            [name, description, metaPrimary, metaSecondary, tone, fields],
            index
        ) => ({
            id: `${kind}-${index + 1}`,
            kind,
            name,
            description,
            metaPrimary,
            metaSecondary,
            tone,
            fields: fields.map((f) => ({ ...f })),
        })
    );
}
