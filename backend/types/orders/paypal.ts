export interface PayPalOrderResponse {
  id: string;
  intent: string;
  status: string;
  payment_source: {
    paypal: {
      email_address: string;
      account_id: string;
      account_status: string;
      name: {
        given_name: string;
        surname: string;
      };
      business_name: string;
      phone_number: {
        national_number: string;
      };
      address: {
        address_line_1: string;
        admin_area_2: string;
        admin_area_1: string;
        postal_code: string;
        country_code: string;
      };
    };
  };
  purchase_units: [
    {
      reference_id: string;
      amount: {
        currency_code: string;
        value: string;
      };
      payee: {
        email_address: string;
        merchant_id: string;
      };
      shipping: {
        name: {
          full_name: string;
        };
        address: {
          address_line_1: string;
          admin_area_2: string;
          admin_area_1: string;
          postal_code: string;
          country_code: string;
        };
      };
      payments: {
        captures: [
          {
            id: string;
            status: string;
            amount: {
              currency_code: string;
              value: string;
            };
            final_capture: true;
            disbursement_mode: string;
            seller_protection: {
              status: string;
              dispute_categories: string[];
            };
            seller_receivable_breakdown: {
              gross_amount: {
                currency_code: string;
                value: string;
              };
              paypal_fee: {
                currency_code: string;
                value: string;
              };
              net_amount: {
                currency_code: string;
                value: string;
              };
            };
            links: [
              {
                href: string;
                rel: string;
                method: string;
              },
              {
                href: string;
                rel: string;
                method: string;
              },
              {
                href: string;
                rel: string;
                method: string;
              }
            ];
            create_time: string;
            update_time: string;
          }
        ];
      };
    }
  ];
  payer: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
    payer_id: string;
    phone: {
      phone_number: {
        national_number: string;
      };
    };
    address: {
      address_line_1: string;
      admin_area_2: string;
      admin_area_1: string;
      postal_code: string;
      country_code: string;
    };
  };
  create_time: string;
  update_time: string;
  links: [
    {
      href: string;
      rel: string;
      method: string;
    }
  ];
}
