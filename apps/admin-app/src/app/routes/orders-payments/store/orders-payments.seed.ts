import {
    AdminOrder,
    AdminOrderDetail,
    AdminPaymentMethod,
    AdminTransaction,
    OrderCurrency,
    OrderStat,
    OrderStatus,
    TransactionType,
} from '../../../shared/models/cms.model';

export const SEEDED_ORDER_TOTAL = 1204;

export const SEEDED_ORDER_STATS: OrderStat[] = [
    { label: 'Revenue · this month', value: '$8,240', meta: '412 paid orders' },
    {
        label: 'Gems spent · this month',
        value: '184,300',
        meta: '1,908 in-app orders',
    },
    { label: 'Pending / failed', value: '3', meta: 'Needs manual review' },
];

/** `[id, user, items, total, currency, status, date]` */
const ORDER_SEEDS: [
    string,
    string,
    number,
    string,
    OrderCurrency,
    OrderStatus,
    string
][] = [
    ['ord_20418', 'Nguyễn Minh Anh', 2, '$12.98', 'money', 'PAID', '14 Mar'],
    ['ord_20417', 'Trần Quốc Bảo', 1, '350 gems', 'gems', 'PAID', '14 Mar'],
    ['ord_20416', 'Lê Thu Hà', 3, '$24.97', 'money', 'PENDING', '13 Mar'],
    ['ord_20415', 'Phạm Gia Huy', 1, '200 gems', 'gems', 'PAID', '13 Mar'],
    ['ord_20414', 'Đỗ Khánh Linh', 1, '$8.99', 'money', 'CANCELLED', '12 Mar'],
    ['ord_20413', 'Vũ Tuấn Kiệt', 2, '440 gems', 'gems', 'PAID', '12 Mar'],
    ['ord_20412', 'Hoàng Bảo Châu', 1, '$1.99', 'money', 'PAID', '11 Mar'],
    ['ord_20411', 'Dương Nhật Nam', 4, '$32.96', 'money', 'PENDING', '11 Mar'],
];

export function seedOrders(): AdminOrder[] {
    return ORDER_SEEDS.map(
        ([id, userName, items, total, currency, status, date]) => ({
            id,
            userName,
            items,
            total,
            currency,
            status,
            date,
        })
    );
}

/** Line items per order kind — money orders carry several, gem orders one. */
export function seedOrderLines(order: AdminOrder): AdminOrderDetail['lines'] {
    if (order.currency === 'gems') {
        return [
            {
                name: 'Energy Refill',
                price: order.total,
                quantity: 1,
                subtotal: order.total,
            },
        ];
    }
    return [
        {
            name: 'Exam Pack: THPTQG',
            price: '$8.99',
            quantity: 1,
            subtotal: '$8.99',
        },
        {
            name: 'Double XP · 15min',
            price: '$1.99',
            quantity: 2,
            subtotal: '$3.98',
        },
    ];
}

/** `[id, user, description, type, amount, currency, order, date]` */
const TRANSACTION_SEEDS: [
    string,
    string,
    string,
    TransactionType,
    string,
    string,
    string | null,
    string
][] = [
    ['tx_88401', 'Nguyễn Minh Anh', 'Purchase — Exam Pack: THPTQG', 'Debit', '−$8.99', 'Real money', 'ord_20418', '14 Mar'],
    ['tx_88400', 'Trần Quốc Bảo', 'Spent gems — Energy Refill', 'Debit', '−350', 'In-app', 'ord_20417', '14 Mar'],
    ['tx_88399', 'Trần Quốc Bảo', 'Quest reward — daily streak', 'Credit', '+100', 'In-app', null, '14 Mar'],
    ['tx_88398', 'Lê Thu Hà', 'Purchase — Double XP ×3', 'Debit', '−$5.97', 'Real money', 'ord_20416', '13 Mar'],
    ['tx_88397', 'Phạm Gia Huy', 'Spent gems — Streak Freeze', 'Debit', '−200', 'In-app', null, '13 Mar'],
    ['tx_88396', 'Đỗ Khánh Linh', 'Refund — cancelled order', 'Credit', '+$8.99', 'Real money', 'ord_20414', '12 Mar'],
    ['tx_88395', 'Vũ Tuấn Kiệt', 'Achievement reward — Wildfire', 'Credit', '+50', 'In-app', null, '12 Mar'],
    ['tx_88394', 'Hoàng Bảo Châu', 'Purchase — Hint Pack ×5', 'Debit', '−$1.99', 'Real money', 'ord_20412', '11 Mar'],
    ['tx_88393', 'Dương Nhật Nam', 'Gem top-up — 1,200 gems', 'Credit', '+1,200', 'In-app', 'ord_20411', '11 Mar'],
];

export function seedTransactions(): AdminTransaction[] {
    return TRANSACTION_SEEDS.map(
        ([id, userName, description, type, amount, currency, orderId, date]) => ({
            id,
            userName,
            description,
            type,
            amount,
            currency,
            orderId,
            date,
        })
    );
}

/** `[name, provider, fee, volume, live]` */
const METHOD_SEEDS: [string, string, string, string, boolean][] = [
    ['Stripe — Cards', 'Stripe', '2.9% + $0.30', '$5,120', true],
    ['Stripe — Apple Pay', 'Stripe', '2.9% + $0.30', '$1,480', true],
    ['PayPal Checkout', 'PayPal', '3.4% + $0.35', '$980', true],
    ['VietQR Transfer', 'Bank transfer', '0.6%', '$660', true],
    ['Momo Wallet', 'Bank transfer', '1.8%', '$0', false],
];

export function seedPaymentMethods(): AdminPaymentMethod[] {
    return METHOD_SEEDS.map(([name, provider, fee, volume, live], index) => ({
        id: `pm-${index + 1}`,
        name,
        provider,
        fee,
        volume,
        live,
    }));
}
