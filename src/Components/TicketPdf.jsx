import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 900,
    },
  ],
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontWeight: 500,
    fontSize: 14,
    fontFamily: "Open Sans",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid black",
    paddingTop: 10,
  },
  bookingId: {
    fontWeight: "bold",
  },
  movieTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  orderSummary: {
    marginTop: 10,
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    paddingVertical: 10,
  },
  summaryItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  footer: {
    marginTop: 20,
  },
  logo: {
    width: "150px",
    marginBottom: 20,
    marginLeft: "-10px",
  },
  qr: {
    width: "100px",
    height: "100px",
    marginTop: 20,
  },
});

function formatDate(inputDate) {
  const date = new Date(inputDate);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Determine the suffix for the day
  let suffix;
  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  } else {
    suffix = "th";
  }

  return `${dayOfWeek}, ${day}${suffix} ${month} ${year}`;
}

// Create PDF
const TicketPdf = (props) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View
          style={[
            styles.section,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/Disney_cinema_logo.png"
            alt=""
            style={styles.logo}
          />
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzp1A8M-3GdYvOukg9_hakfd-PdZeGsgyLzA&s"
            alt=""
            style={[styles.logo, { marginLeft: 0, marginRight: "-25px" }]}
          />
        </View>

        {/* Header Section */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", gap: 1 }}>
            <Text>Booking ID:</Text>
            <Text style={{ fontWeight: 900, fontFamily: "Open Sans" }}>
              {props.bookingData.bookingId}
            </Text>
          </View>
          <Text style={{ fontWeight: 900, fontFamily: "Open Sans" }}>
            {formatDate(props.bookingData.date)}
          </Text>
        </View>
        <View
          style={[
            styles.section,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <View>
            <View style={[styles.section, styles.movieTitle]}>
              <Text>{props.movieName}</Text>
              <Text style={{ fontWeight: 500, fontSize: 14 }}>
                English, (U/A)
              </Text>
            </View>
            <View
              style={[
                styles.section,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <View style={{ width: "350px" }}>
                <Text>INOX Swabhumi, Maulana Abdul Kalam Azad Sarani</Text>
                <Text style={{ fontWeight: 900, fontFamily: "Open Sans" }}>
                  Screen 1
                </Text>
                <View style={{ flexDirection: "row", gap: 1 }}>
                  <Text>Seat Number</Text>
                  <Text
                    style={{
                      fontWeight: 900,
                      fontFamily: "Open Sans",
                      marginLeft: 5,
                    }}
                  >
                    {props.bookingData.selected.join(",")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Image src={props.qrdata} alt="" style={styles.qr} />
        </View>

        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <Text style={{ fontWeight: 900, fontFamily: "Open Sans" }}>
            Order Summary
          </Text>
          <View style={styles.summaryItem}>
            <Text>Ticket Cost</Text>
            <Text>
              Rs. {props.bookingData.price + props.formData.promoDiscount}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text>Convenience Fee</Text>
            <Text>Rs. 10</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text>Service Tax</Text>
            <Text>Rs. {0.12 * props.bookingData.price}</Text>
          </View>
          {props.formData.promoApplied && (
            <View style={styles.summaryItem}>
              <Text>Promo Discount</Text>
              <Text>Rs. {props.formData.promoDiscount}</Text>
            </View>
          )}
          <View style={styles.summaryItem}>
            <Text style={{ fontWeight: 900, fontFamily: "Open Sans" }}>
              Total
            </Text>
            <Text style={{ fontWeight: 900, fontFamily: "Open Sans" }}>
              Rs.{" "}
              {(
                props.bookingData.price +
                (0.12 * props.bookingData.price + 10)
              ).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Footer Notes */}
        <View style={styles.footer}>
          <Text style={{ fontWeight: 900, fontFamily: "Open Sans" }}>
            Important Notes:
          </Text>
          <Text
            style={{
              fontWeight: 500,
              fontFamily: "Open Sans",
              fontSize: 10,
              marginTop: 10,
            }}
          >
            Tickets & food once ordered cannot be exchanged, cancelled or
            refunded.
          </Text>
          <Text
            style={{ fontWeight: 500, fontFamily: "Open Sans", fontSize: 10 }}
          >
            Children aged 3 years and above will require a separate ticket.
          </Text>
          <Text
            style={{ fontWeight: 500, fontFamily: "Open Sans", fontSize: 10 }}
          >
            The 3D glasses will be available at the cinema for 3D films and must
            be returned before you exit the premises.
          </Text>
          <Text
            style={{ fontWeight: 500, fontFamily: "Open Sans", fontSize: 10 }}
          >
            3D Glasses are chargeable (refundable/ non-refundable) as per
            individual cinema policies.
          </Text>
          <Text
            style={{ fontWeight: 500, fontFamily: "Open Sans", fontSize: 10 }}
          >
            Items like laptop, cameras knifes, lighter, match box, cigarettes,
            firearms and all types of inflammable objects are strictly
            prohibited.
          </Text>
          <Text
            style={{ fontWeight: 500, fontFamily: "Open Sans", fontSize: 10 }}
          >
            Items like carrybags eatables, helmets, handbags are not allowed
            inside the theaters are strictly prohibited.
          </Text>
          <Text
            style={{ fontWeight: 500, fontFamily: "Open Sans", fontSize: 10 }}
          >
            Kindly deposit at the baggage counter of mall/cinema.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default TicketPdf;
