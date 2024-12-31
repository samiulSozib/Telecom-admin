export interface Admin {
    id: number;
    user_id: number;
    name: string;
    email: string;
    phone: string;
    user_type: string;
    email_verified_at: string | null;
    profile_image_url: string;
    status: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Currency {
    id: number;
    name: string;
    code: string;
    symbol: string;
    ignore_digits_count: string | null;
    exchange_rate_per_usd: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserInfo {
    id: number;
    uuid: string;
    name: string;
    email: string;
    phone: string;
    user_type: string;
    email_verified_at: string | null;
    currency_preference_code: string;
    currency_preference_id: number;
    fcm_token: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    admin: Admin | null;
    currency: Currency | null;
}

export interface Bundle {
    id: number;
    bundle_code: string;
    service_id: number;
    bundle_title: string;
    bundle_description: string;
    bundle_type: string | null;
    validity_type: string;
    admin_buying_price: string;
    buying_price: string;
    selling_price: string;
    amount: string | null;
    bundle_image_url: string | null;
    currency_id: number;
    expired_date: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    service: Service | null;
    currency: Currency | null;

}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
    page: number | null;
}

export interface Pagination {
    page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    links: PaginationLink[];
    items_per_page: number;
    total: number;
}

export interface CompanyCode {
    id: number;
    company_id: number;
    reserved_digit: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    company: Company | null;
}

export interface Telegram_Chat_Id {
    id: number,
    chat_id: number,
    group_name: string,
    created_at: string,
    updated_at: string
}

export interface Company {
    id: number;
    company_name: string;
    company_logo: File | string;
    country_id: number;
    telegram_chat_id: Telegram_Chat_Id | null;
    _telegram_chat_id: number | null,
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    country: Country | null;
}

export interface Country {
    id: number;
    country_name: string;
    country_flag_image_url: string | null;
    language_id: number | null;
    country_telecom_code: string;
    phone_number_length: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    currency: string | null;
    language: Language | null
}

export interface Language {
    id: number;
    language_name: string;
    language_code: string;
    direction: 'rtl' | 'ltr';
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Currency {
    id: number;
    name: string;
    code: string;
    symbol: string;
    ignore_digits_count: string | null;
    exchange_rate_per_usd: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface MoneyTransaction {
    id: number;
    reseller_id: number;
    amount: string;
    remaining_balance: string | null;
    transaction_type: string | null;
    transaction_source: string | null;
    currency_code: string | null;
    currency_id: number;
    status: string;
    initiator_id: number;
    initiator_type: string;
    transaction_reason: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    sub_reseller_id: string | null;
    reseller: Reseller | null;
    currency: Currency|null;
    order: string | null;
}

export interface Reseller {
    id: number;
    user_id: number;
    parent_id: number | null;
    uuid: string;
    reseller_name: string;
    contact_name: string;
    reseller_type: string;
    email_verified_at: string | null;
    account_password: string;
    personal_pin: string;
    remember_token: string | null;
    profile_image_url: string;
    email: string;
    phone: string;
    country_id: string;
    province_id: string;
    districts_id: string;
    is_reseller_verified: number;
    status: number;
    payment: string;
    balance: string;
    loan_balance: string;
    total_payments_received: string;
    total_balance_sent: string;
    net_payment_balance: string;
    fcm_token: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    user: User|null;
}

export interface User {
    id: number;
    uuid: string;
    name: string;
    email: string;
    phone: string;
    user_type: string;
    email_verified_at: string | null;
    currency_preference_code: string;
    currency_preference_id: number;
    fcm_token: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    currency: Currency;
}

export interface PaymentMethod {
    id: number;
    method_name: string;
    account_details: string;
    account_image: File|string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface Supplier {
    id: number;
    supplier_name: string;
    contact_details: string | null;
    address: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface PurchasedProduct {
    id: number;
    supplier_id: number;
    service_id: number;
    product_name: string;
    quantity: number;
    purchase_price: string;
    purchase_date: string;
    status: number;
    created_at: string;
    updated_at: string;
    supplier: Supplier;
    service: Service;
}

export interface ServiceCategory {
    id: number;
    category_name: string;
    type: string;
    service_category_sub_type_id: number | null;
    category_image_url: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Service {
    id: number;
    service_category_id: number;
    service_name: string,
    company_id: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    service_category: ServiceCategory | null;
    company: Company | null;
}

export interface Supplier {
    id: number;
    supplier_name: string;
    contact_details: string | null;
    address: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface TelegramChat {
    id: number;
    chat_id: number;
    group_name: string;
    created_at: string;
    updated_at: string;
}


export interface Province{
    id:number,
    province_name:string,
    country_id:number,
    deleted_at:string,
    created_at:string,
    updated_at:string,
    country:Country|null
}

export interface District{
    id:number,
    district_name:string,
    province_id:number,
    delete_at:string,
    created_at:string,
    updated_at:string,
    province:Province|null
}


export interface Order{
    id: number;
    reseller_id: number;
    rechargeble_account: string;
    bundle: Bundle|null;
    is_custom_recharge: number;
    order_type: string;
    transaction_id: string | null;
    is_paid: number;
    status: number;
    reject_reason: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    vpn_activation_qr_code_image: string | null;
    vpn_activation_link: string | null;
    reseller: Reseller|null;

}


export interface Advertisement{
    id:number,
    advertisement_title:string,
    ad_slider_image_url:string|null,
    status:number,
    deleted_at:string|null,
    created_at:string|null,
    updated_at:string|null
}


export interface Balance{
    id:number,
    reseller_id:number,
    transaction_type:string,
    payment_id:number|null,
    amount:string,
    remaining_balance:string,
    currency_id:number|null,
    description:string,
    created_at:string,
    updated_at:string,
    reseller:Reseller|null,
    currency:Currency|null
}
