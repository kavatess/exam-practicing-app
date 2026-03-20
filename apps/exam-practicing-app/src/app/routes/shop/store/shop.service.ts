import { Injectable } from '@angular/core';
import { ShopSection } from '@libs/models';
import { delay, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ShopService {
    getShopList(): Observable<ShopSection[]> {
        return of([
            {
                id: '1',
                title: 'Trái tim',
                items: [
                    {
                        id: '11',
                        title: 'Hồi phục Trái tim',
                        description:
                            'Lấp đầy trái tim để không phải lo lắng mắc lỗi sai trong bài học',
                        iconUrl:
                            'https://d35aaqx5ub95lt.cloudfront.net/images/goals/2b5a211d830a24fab92e291d50f65d1d.svg', // Replace with your image path
                        price: 100,
                        currency: {
                            id: 'abc',
                            title: 'Gems',
                            iconUrl:
                                'https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b54c6eed7eee.svg',
                        },
                        currencyId: 'abc',
                    },
                    {
                        id: '12',
                        title: 'Trái tim vô hạn',
                        description:
                            'Không bao giờ hết trái tim khi học với Super!',
                        iconUrl:
                            'https://d35aaqx5ub95lt.cloudfront.net/images/goals/2b5a211d830a24fab92e291d50f65d1d.svg', // Replace with your image path
                        price: 100000,
                        // currency: {
                        //     id: '333',
                        //     title: 'Vietnamese Dong',
                        // },
                        currency: {
                            id: 'abc',
                            title: 'Gems',
                            iconUrl:
                                'https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b54c6eed7eee.svg',
                        },
                        currencyId: '333',
                    },
                ],
            },
            {
                id: '2',
                title: 'Tăng sức mạnh',
                items: [
                    {
                        id: '21',
                        title: 'Streak Freeze',
                        description:
                            'Streak Freeze cho phép bạn giữ nguyên streak ngay cả khi bạn không vào học trong một ngày',
                        iconUrl:
                            'https://d35aaqx5ub95lt.cloudfront.net/images/icons/216ddc11afcbb98f44e53d565ccf479e.svg', // Replace with your image path
                        price: 200,
                        currency: {
                            id: 'abc',
                            title: 'Gems',
                            iconUrl:
                                'https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b54c6eed7eee.svg',
                        },
                        currencyId: 'abc',
                    },
                ],
            },
        ]);
    }

    purchaseItem(itemId: string | number): Observable<any> {
        return of({}).pipe(delay(1500));
    }
}
